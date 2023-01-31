<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\JsonResponse;

class FileController extends Controller
{
  public function index(): JsonResponse
  {
    return response()->json(File::all());
  }
}
