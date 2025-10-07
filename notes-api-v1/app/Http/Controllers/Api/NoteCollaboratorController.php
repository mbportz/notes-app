<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\User;
use App\Models\NoteCollaborator;
use Illuminate\Http\Request;
use App\Models\Friendship;

class NoteCollaboratorController extends Controller
{
    // GET /api/notes/{note}/collaborators
    public function index(Request $request, Note $note)
    {
        $auth = $request->user();

        // Only owner or a collaborator can see the list
        $canSee = $note->owner_id === $auth->id
            || $note->collaborators()->where('users.id', $auth->id)->exists();
        abort_unless($canSee, 403, 'Not authorized.');

        $ownerId = $note->owner_id;

        // Collect friend IDs via Eloquent (two plucks, then merge)
        $friendIds = Friendship::where('user_id', $ownerId)->pluck('friend_id')
            ->merge(
                Friendship::where('friend_id', $ownerId)->pluck('user_id')
            )
            ->unique()
            ->values(); // clean collection for whereIn

        // Return collaborators who are currently friends with the owner
        $collabs = $note->collaborators()
            ->whereIn('users.id', $friendIds)
            ->select(
                'users.id',
                'users.username',
                'users.email',
                'note_collaborators.can_edit',
                'note_collaborators.can_delete'
            )
            ->get();

        return response()->json($collabs);
    }

    // POST /api/notes/{note}/collaborators
    public function store(Request $request, Note $note)
    {
        // Only owner can add
        abort_unless($note->owner_id === $request->user()->id, 403, 'Only owner can add collaborators.');

        $data = $request->validate([
            'user_id'    => ['required', 'exists:users,id'],
            'can_edit'   => ['sometimes', 'boolean'],
            'can_delete' => ['sometimes', 'boolean'],
        ]);

        // (Optional) Prevent adding the owner as collaborator
        if ((int) $data['user_id'] === (int) $note->owner_id) {
            return response()->json(['message' => 'Owner is already allowed.'], 422);
        }

        $ownerId = $note->owner_id;
        $collaboratorId = (int) $data['user_id'];

        $isFriend = \App\Models\Friendship::where(function ($q) use ($ownerId, $collaboratorId) {
            $q->where('user_id', min($ownerId, $collaboratorId))
                ->where('friend_id', max($ownerId, $collaboratorId));
        })->exists();

        abort_unless($isFriend, 422, 'Collaborator must be a friend of the note owner.');

        // Upsert-like behavior: attach or update pivot
        $note->collaborators()->syncWithoutDetaching([
            $data['user_id'] => [
                'can_edit'   => (bool) ($data['can_edit']   ?? false),
                'can_delete' => (bool) ($data['can_delete'] ?? false),
            ]
        ]);

        $pivot = NoteCollaborator::where('note_id', $note->id)
            ->where('user_id', $data['user_id'])
            ->first();

        return response()->json($pivot->load('user:id,username,email'), 201);
    }

    // PATCH /api/notes/{note}/collaborators/{user}
    public function update(Request $request, Note $note, User $user)
    {
        // Only owner can update collaborator permissions
        abort_unless($note->owner_id === $request->user()->id, 403, 'Only owner can update collaborators.');

        $data = $request->validate([
            'can_edit'   => ['sometimes', 'boolean'],
            'can_delete' => ['sometimes', 'boolean'],
        ]);

        // ✅ Enforce collaborator must still be a friend of the owner
        $ownerId        = $note->owner_id;
        $collaboratorId = $user->id;

        $isFriend = \App\Models\Friendship::where(function ($q) use ($ownerId, $collaboratorId) {
            $q->where('user_id', min($ownerId, $collaboratorId))
                ->where('friend_id', max($ownerId, $collaboratorId));
        })->exists();

        abort_unless($isFriend, 422, 'Collaborator must be a friend of the note owner.');

        $pivot = NoteCollaborator::where('note_id', $note->id)
            ->where('user_id', $user->id)
            ->first();

        abort_unless($pivot, 404, 'Collaborator not found.');

        $pivot->update([
            'can_edit'   => array_key_exists('can_edit', $data)   ? (bool) $data['can_edit']   : $pivot->can_edit,
            'can_delete' => array_key_exists('can_delete', $data) ? (bool) $data['can_delete'] : $pivot->can_delete,
        ]);

        return response()->json($pivot->fresh()->load('user:id,username,email'));
    }

    // DELETE /api/notes/{note}/collaborators/{user}
    public function destroy(Request $request, Note $note, User $user)
    {
        // Only owner can remove collaborator
        abort_unless($note->owner_id === $request->user()->id, 403, 'Only owner can remove collaborators.');

        $exists = $note->collaborators()->where('users.id', $user->id)->exists();
        abort_unless($exists, 404, 'Collaborator not found.');

        $note->collaborators()->detach($user->id);

        return response()->json(null, 204);
    }
}
