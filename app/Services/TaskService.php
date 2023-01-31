<?php

namespace App\Services;

use App\Http\Requests\TaskCreateRequest;
use App\Models\Task;
use App\Types\TaskType;
use Illuminate\Http\Request;

class TaskService
{
  public function store(TaskCreateRequest $request): Task
  {
    $data = new TaskType(title: $request->title, description: $request->description, status: $request->status);
    $task = Task::create($data->toArray());

    (new FileService)->store((new Request())->merge(['file' => $request->file, 'task_id' => $task->id]));

    return $task;
  }
}
