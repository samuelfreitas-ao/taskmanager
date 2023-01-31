<?php

namespace App\Types;

class TaskType
{
  public function __construct(
    private string $title,
    private string $description,
    private string $status,
  ) {
  }

  public function toArray(): array
  {
    return [
      'title' => trim($this->title),
      'description' => trim($this->description),
      'status' => trim($this->status),
    ];
  }
}
