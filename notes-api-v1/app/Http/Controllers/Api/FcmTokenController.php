<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FcmToken;
use Illuminate\Http\Request;

class FcmTokenController extends Controller
{
    // POST /api/fcm/register  { token: string, platform?: 'web' }
    public function store(Request $request)
    {
        $data = $request->validate([
            'token'    => ['required', 'string', 'max:255'],
            'platform' => ['sometimes', 'in:web,android,ios'],
        ]);

        $record = FcmToken::updateOrCreate(
            ['user_id' => $request->user()->id, 'token' => $data['token']],
            [
                'platform' => $data['platform'] ?? 'web',
                'agent'    => substr($request->userAgent() ?? '', 0, 255),
            ]
        );

        return response()->json($record, 201);
    }

    // DELETE /api/fcm/{token}
    public function destroy(Request $request, string $token)
    {
        FcmToken::where('user_id', $request->user()->id)
            ->where('token', $token)
            ->delete();

        return response()->json(null, 204);
    }
}
