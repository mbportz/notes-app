<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Friendship;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FriendshipController extends Controller
{
    // GET /api/friends
    public function index(Request $request)
    {
        $authId = $request->user()->id;

        // Pull friends regardless of which column the auth user appears in
        $friends = User::query()
            ->select('users.id', 'users.username', 'users.email', 'users.first_name', 'users.last_name')
            ->whereIn('users.id', function ($q) use ($authId) {
                $q->from('friendships')
                    ->select('friend_id')->where('user_id', $authId);
            })
            ->orWhereIn('users.id', function ($q) use ($authId) {
                $q->from('friendships')
                    ->select('user_id')->where('friend_id', $authId);
            })
            ->orderBy('users.id', 'desc')
            ->paginate(10);

        return response()->json($friends);
    }

    // DELETE /api/friends/{user}
    public function destroy(Request $request, User $user)
    {
        $authId = $request->user()->id;
        abort_if($authId === $user->id, 422, 'Cannot unfriend yourself.');

        $a = min($authId, $user->id);
        $b = max($authId, $user->id);

        $deleted = Friendship::where('user_id', $a)
            ->where('friend_id', $b)
            ->delete();

        abort_if(!$deleted, 404, 'Friendship not found.');

        return response()->json(null, 204);
    }
}
