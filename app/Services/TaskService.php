<?php

namespace App\Services;

use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Models\Task;
use App\Types\TaskType;
use Illuminate\Http\Request;

class TaskService
{
	public function store(TaskCreateRequest $request): Task
	{
		$data = new TaskType(title: $request->title, description: $request->description, status: $request->status);
		$task = Task::create($data->toArray());

		if ($request->file) {
			(new FileService)->store((new Request())->merge(['file' => $request->file, 'task_id' => $task->id]));
		}

		return $task;
	}

	public function update(TaskUpdateRequest $request, $id): Task | null
	{
		if (!$task = Task::find($id)) {
			return null;
		}
		$data = new TaskType(title: $request->title, description: $request->description, status: $request->status);
		$task->update($data->toArray());

		return $task;
	}

	public function destroy(int $id, bool $softDelete = false): bool
	{
		if (!$task = Task::find($id)) {
			return false;
		};
		if ($softDelete) {
			$task->delete();
		} else {
			if ($filePaths = $task->files->pluck('path')->toarray()) {
				(new FileService)->deleteFiles($filePaths);
			}
			$task->forceDelete();
		}

		return true;
	}
}
