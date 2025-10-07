<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FriendRequest;
use App\Models\Friendship;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FriendRequestController extends Controller
{
    // GET /api/friend-requests/incoming
    public function incoming(Request $request)
    {
        $items = FriendRequest::with('sender:id,username,email')
            ->where('receiver_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json($items);
    }

    // GET /api/friend-requests/outgoing
    public function outgoing(Request $request)
    {
        $items = FriendRequest::with('receiver:id,username,email')
            ->where('sender_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json($items);
    }

    // POST /api/friend-requests  { receiver_id }
    public function store(Request $request)
    {
        $data = $request->validate([
            'receiver_id' => ['required', 'exists:users,id', 'different:auth_user'],
        ], [], ['receiver_id' => 'receiver']);

        // resolve "different:auth_user"
        $request->merge(['auth_user' => $request->user()->id]);
        $request->validate(['receiver_id' => 'different:auth_user']);

        $senderId   = $request->user()->id;
        $receiverId = (int) $data['receiver_id'];

        // 1) Already friends?
        $alreadyFriends = Friendship::where(function ($q) use ($senderId, $receiverId) {
            $q->where('user_id', min($senderId,$receiverId))
              ->where('friend_id', max($senderId,$receiverId));
        })->exists();

        if ($alreadyFriends) {
            return response()->json(['message' => 'You are already friends.'], 409);
        }

        // 2) Existing pending request either direction?
        $pendingExists = FriendRequest::whereIn('status', ['pending'])
            ->where(function ($q) use ($senderId, $receiverId) {
                $q->where(function ($q2) use ($senderId, $receiverId) {
                    $q2->where('sender_id', $senderId)->where('receiver_id', $receiverId);
                })->orWhere(function ($q2) use ($senderId, $receiverId) {
                    $q2->where('sender_id', $receiverId)->where('receiver_id', $senderId);
                });
            })->exists();

        if ($pendingExists) {
            return response()->json(['message' => 'A pending request already exists.'], 409);
        }

        $fr = FriendRequest::create([
            'sender_id'   => $senderId,
            'receiver_id' => $receiverId,
            'status'      => 'pending',
        ]);

        return response()->json($fr->load('receiver:id,username,email'), 201);
    }

    // PATCH /api/friend-requests/{id}  { action: 'accept'|'decline'|'block' }
    public function respond(Request $request, $id)
    {
        $request->validate([
            'action' => ['required', Rule::in(['accept','decline','block'])],
        ]);

        $fr = FriendRequest::findOrFail($id);

        // Only the receiver can respond
        abort_unless($fr->receiver_id === $request->user()->id, 403, 'Not authorized.');

        if ($fr->status !== 'pending' && $request->action === 'accept') {
            return response()->json(['message' => 'Only pending requests can be accepted.'], 422);
        }

        if ($request->action === 'accept') {
            // Create friendship (undirected: store ordered pair)
            $a = min($fr->sender_id, $fr->receiver_id);
            $b = max($fr->sender_id, $fr->receiver_id);

            Friendship::firstOrCreate([
                'user_id'   => $a,
                'friend_id' => $b,
            ]);

            $fr->update(['status' => 'accepted']);
        } elseif ($request->action === 'decline') {
            $fr->update(['status' => 'declined']);
        } else { // block
            $fr->update(['status' => 'blocked']);
        }

        return response()->json($fr->fresh());
    }

    // DELETE /api/friend-requests/{id}
    // Sender can cancel their pending request; receiver can also remove/cleanup.
    public function cancel(Request $request, $id)
    {
        $fr = FriendRequest::findOrFail($id);

        $isSender   = $fr->sender_id   === $request->user()->id;
        $isReceiver = $fr->receiver_id === $request->user()->id;
        abort_unless($isSender || $isReceiver, 403, 'Not authorized.');

        // Only pending requests make sense to cancel from sender side; allow cleanup otherwise.
        if ($isSender && $fr->status !== 'pending') {
            return response()->json(['message' => 'Only pending requests can be canceled by sender.'], 422);
        }

        $fr->delete();

        return response()->json(null, 204);
    }
}
