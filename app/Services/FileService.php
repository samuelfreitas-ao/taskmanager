<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Models\File;
use Illuminate\Http\Request;

class FileService
{
  public function store(Request $request): bool
  {
    $file = $request->file;
    $taskId = $request->task_id;

    $filePath = FileHelper::upload($file);

    $paths = is_array($filePath) ? $filePath : [$filePath];
    $data = [];
    foreach ($paths as $path) {
      $data[] = ['task_id' => $taskId, 'path' => $path, 'type' => FileHelper::getType($path), 'created_At' => now()];
    }

    if (count($data) < 0) return false;

    File::insert($data);
    return true;
  }

  public function deleteFiles(string | array $filePath): void
  {
    FileHelper::removeUpload(is_array($filePath) ? $filePath : [$filePath]);
  }
}
