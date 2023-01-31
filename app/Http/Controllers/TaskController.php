<?php

namespace App\Http\Controllers;

use App\Helpers\MessageHelper;
use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskController extends Controller
{
  public function index(): AnonymousResourceCollection
  {
    $tasks = Task::orderby('id', 'desc')->get();
    $tasks->load('files');
    return TaskResource::collection($tasks);
  }

  public function store(TaskCreateRequest $request, TaskService $service): JsonResponse
  {
    try {
      $task = $service->store($request);
      $task->load('files');

      return MessageHelper::successJson(message: 'Tarefa cadastrada com sucesso.', data: new TaskResource($task));
    } catch (\Throwable $th) {
      return MessageHelper::errorJson(message: 'Erro ao cadastrar tarefa. Tente novamente.');
    }
  }

  public function show(int $id): JsonResource | JsonResponse
  {
    $task = Task::find($id);
    if ($task) {
      $task->load('files');

      return new TaskResource($task);
    } else {
      return MessageHelper::errorJson(message: 'Tarefa não encontrada.');
    }
  }

  public function update(TaskUpdateRequest $request, TaskService $service, int $id): JsonResponse
  {
    try {
      $task = $service->update($request, $id);
      if (!$task) {
        return MessageHelper::errorJson(message: 'Tarefa não encontrada.');
      }
      $task->load('files');

      return MessageHelper::successJson(message: 'Tarefa actualizada com sucesso.', data: new TaskResource($task));
    } catch (\Throwable $th) {
      return MessageHelper::errorJson(message: 'Houve um erro ao actualizar tarefa. Tente novamente.');
    }
  }

  public function destroy(TaskService $service, int $id): JsonResponse
  {
    try {
      $softDelete = in_array(request()->query('soft'), [true, 'true', 1, '1']);

      $taskDeleted = $service->destroy(id: $id, softDelete: $softDelete);

      if (!$taskDeleted) {
        return MessageHelper::errorJson(message: 'Tarefa não encontrada.');
      }
      return MessageHelper::successJson(message: 'Tarefa excluída com sucesso.');
    } catch (\Throwable $th) {
      return MessageHelper::errorJson(message: 'Erro ao excluir tarefa. Tente novamente.');
    }
  }
}
