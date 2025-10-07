<?php

namespace App\Services;

use App\Models\User;
use App\Models\FcmToken;
use Kreait\Firebase\Contract\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Messaging\WebPushConfig;

class PushService
{
   public function __construct(private Messaging $messaging) {}

   public function sendToUser(User $user, string $title, string $body, array $data = [], ?string $clickLink = null): array
   {
      $tokens = FcmToken::where('user_id', $user->id)
         ->where('platform', 'web')
         ->pluck('token')
         ->all();

      if (empty($tokens)) {
         return ['sent' => 0, 'success' => 0, 'failure' => 0, 'message' => 'No web tokens'];
      }

      $webPush = WebPushConfig::fromArray([
         'notification' => [
            'title' => $title,
            'body'  => $body,
         ],
         'fcm_options' => [
            'link' => $clickLink ?? 'https://your-frontend.example.com',
         ],
      ]);

      $data = array_map(fn($v) => (string) $v, $data);

      $message = CloudMessage::new()
         ->withNotification(Notification::create($title, $body))
         ->withWebPushConfig($webPush)
         ->withData($data);

      $report = $this->messaging->sendMulticast($message, $tokens);

      foreach ($report->failures()->getItems() as $failure) {
         $invalidToken = $failure->target()->value();
         FcmToken::where('token', $invalidToken)->delete();
      }

      return [
         'sent'    => count($tokens),
         'success' => $report->successes()->count(),
         'failure' => $report->failures()->count(),
      ];
   }
}
