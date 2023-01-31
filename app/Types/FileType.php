<?php

namespace App\Types;

use Illuminate\Http\UploadedFile;

class FileType
{
  public function __construct(public UploadedFile|array $file, public int $task_id)
  {
  }
}
