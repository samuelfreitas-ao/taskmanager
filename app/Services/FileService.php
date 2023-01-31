<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Types\FileType;
use Illuminate\Http\Request;

class FileService
{
  public function store(Request $request): void
  {
    FileHelper::upload(new FileType(file: $request->file, task_id: $request->task_id));
  }

  public function deleteFiles(string | array $filePath): void
  {
    FileHelper::removeUpload(is_array($filePath) ? $filePath : [$filePath]);
  }
}
