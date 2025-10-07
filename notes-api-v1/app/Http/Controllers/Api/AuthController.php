<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use \App\Models\RefreshToken;

class AuthController extends Controller
{
    //POST /api/register
    public function register(Request $request)
    {
        $data = $request->validate([
            'username'   => 'required|string|max:60|unique:users',
            'email'      => 'required|string|email|max:255|unique:users',
            'first_name' => 'nullable|string|max:60',
            'last_name'  => 'nullable|string|max:60',
            'password'   => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'first_name' => $data['first_name'] ?? null,
            'last_name' => $data['last_name'] ?? null,
            'password' => $data['password'],
        ]);

        $token = $user->createToken('api_token')->plainTextToken;
        $refresh = $this->issueRefreshToken($user);

        return response()->json([
            'user' => $user,
            'token' => $token,
            'refresh_token'  => $refresh['token'],
            'refresh_expires_at' => $refresh['expires_at'],
        ]);
    }

    // POST /api/login
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('api_token')->plainTextToken;
        $refresh = $this->issueRefreshToken($user);

        return response()->json([
            'user'  => $user,
            'token' => $token,
            'refresh_token'  => $refresh['token'],
            'refresh_expires_at' => $refresh['expires_at'],
        ]);
    }

    // POST /api/logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        // optional: also revoke provided refresh token
        if ($rt = $request->input('refresh_token')) {
            RefreshToken::where('token_hash', hash('sha256', $rt))
                ->where('user_id', $request->user()->id)
                ->update(['revoked' => true]);
        }

        return response()->json(['message' => 'Logged out']);
    }

    public function refresh(\Illuminate\Http\Request $request)
    {
        // Accept from JSON body or (optionally) from cookie
        $request->validate([
            'refresh_token' => ['nullable', 'string', 'size:64'], // 64 hex chars from bin2hex
        ]);

        $raw = $request->input('refresh_token') ?? $request->cookie('refresh_token');
        if (!$raw) {
            return response()->json(['message' => 'Missing refresh token'], 422);
        }

        $hash = hash('sha256', $raw);

        $rt = \App\Models\RefreshToken::where('token_hash', $hash)
            ->where('revoked', false)
            ->where('expires_at', '>', now())
            ->first();

        if (!$rt) {
            return response()->json(['message' => 'Invalid or expired refresh token'], 401);
        }

        $user = $rt->user;

        // Rotate: revoke old refresh token, issue a new one
        $rt->update(['revoked' => true]);

        $newAccess = $user->createToken('api_token')->plainTextToken;
        $newRefresh = $this->issueRefreshToken($user);

        $payload = [
            'access_token'       => $newAccess,
            'refresh_token'      => $newRefresh['token'],
            'refresh_expires_at' => $newRefresh['expires_at'],
            'token_type'         => 'Bearer',
        ];

        // If using cookie approach:
        // $ttlDays = (int) config('auth.refresh_token_ttl_days', 30);
        // return response()->json($payload)
        //   ->cookie('refresh_token', $newRefresh['token'], $ttlDays*24*60, '/', null, true, true, false, 'Lax');

        return response()->json($payload);
    }


    private function issueRefreshToken(\App\Models\User $user): array
    {
        // raw token (send to client), store only its hash
        $raw = bin2hex(random_bytes(32)); // 64 hex chars
        $hash = hash('sha256', $raw);

        $ttlDays = (int) (config('auth.refresh_token_ttl_days', env('REFRESH_TOKEN_TTL_DAYS', 30)));
        $expiresAt = now()->addDays($ttlDays);

        \App\Models\RefreshToken::create([
            'user_id'    => $user->id,
            'token_hash' => $hash,
            'expires_at' => $expiresAt,
        ]);

        return ['token' => $raw, 'expires_at' => $expiresAt->toIso8601String()];
    }
}
