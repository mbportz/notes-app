<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NoteController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NoteCollaboratorController;
use App\Http\Controllers\Api\FriendRequestController;
use App\Http\Controllers\Api\FriendshipController;
use App\Http\Controllers\Api\FcmTokenController;
use App\Http\Controllers\Api\PushTestController;

Route::prefix('auth')->group(function () {
   Route::post('register', [AuthController::class, 'register']);
   Route::post('login', [AuthController::class, 'login']);
   Route::post('refresh', [AuthController::class, 'refresh']);
   Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
   Route::apiResource('notes', NoteController::class);

   // collaborators for a specific note
   Route::prefix('notes')->group(function () {
      Route::get('{note}/collaborators', [NoteCollaboratorController::class, 'index']);
      Route::post('{note}/collaborators', [NoteCollaboratorController::class, 'store']);
      Route::patch('{note}/collaborators/{user}', [NoteCollaboratorController::class, 'update']);
      Route::delete('{note}/collaborators/{user}', [NoteCollaboratorController::class, 'destroy']);
   });

   // friend-requests
   Route::prefix('friend-requests')->group(function () {
      Route::get('incoming', [FriendRequestController::class, 'incoming']); // to me
      Route::get('outgoing', [FriendRequestController::class, 'outgoing']); // from me
      Route::post('',          [FriendRequestController::class, 'store']);    // send
      Route::patch('{id}',    [FriendRequestController::class, 'respond']);  // accept/decline/block
      Route::delete('{id}',   [FriendRequestController::class, 'cancel']);   // cancel (sender) or withdraw
   });

   // friends
   Route::prefix('friends')->group(function () {
      Route::get('', [FriendshipController::class, 'index']);
      Route::delete('{user}', [FriendshipController::class, 'destroy']);
   });

   // notifications
   Route::prefix('fcm')->group(function () {
      Route::post('register', [FcmTokenController::class, 'store']);  // save or refresh token
      Route::delete('{token}', [FcmTokenController::class, 'destroy']); // optional: remove token
   });

   Route::post('notify/me', [PushTestController::class, 'sendToMe']);
});
