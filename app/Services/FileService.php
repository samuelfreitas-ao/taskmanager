<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Types\FileType;
use Illuminate\Http\Request;

class FileService
{
  public function store(Request $request)
  {
    FileHelper::upload(new FileType(file: $request->file, task_id: $request->task_id));
  }

  public function upload()
  {
  }
}
