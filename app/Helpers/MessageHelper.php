<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class MessageHelper
{
  public static function successJson(string $message, $data = null, $status = 200): JsonResponse
  {
    return response()->json([
      'result' => true,
      'message' => $message,
      'data' => $data,
    ], $status);
  }

  public static function errorJson(string $message, $data = null, $status = 400): JsonResponse
  {
    return response()->json([
      'result' => false,
      'message' => $message,
      'data' => $data,
    ], $status);
  }
}
