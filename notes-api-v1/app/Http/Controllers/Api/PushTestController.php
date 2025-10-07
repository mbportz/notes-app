<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PushService;
use Illuminate\Http\Request;

class PushTestController extends Controller
{
    public function __construct(private PushService $push) {}

    // POST /api/notify/me
    public function sendToMe(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:120'],
            'body'  => ['required', 'string', 'max:500'],
            'link'  => ['nullable', 'url'],
            'data'  => ['sometimes', 'array'],
        ]);

        $result = $this->push->sendToUser(
            $request->user(),
            $data['title'],
            $data['body'],
            $data['data'] ?? [],
            $data['link'] ?? null
        );

        return response()->json($result);
    }
}
