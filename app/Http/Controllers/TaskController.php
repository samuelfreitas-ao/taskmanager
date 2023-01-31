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

  public function destroy(int $id): JsonResponse
  {
    $feedback = ['result' => false, 'message' => '', 'data' => null];

    $task = Task::find($id);
    $softDelete = request()->query('soft');
    // $softDelete = $softDelete || $softDelete == 'true' || $softDelete == '1';
    if (!$task) {
      $feedback['message'] = 'Tarefa não encontrada.';
    } else {
      try {
        $files = $task->files;
        if ($softDelete) {
          $task->delete();
        } else {
          $task->forceDelete();
          if ($files) {
            foreach ($files as $f) {
              FileController::removeUpload($f);
            }
          }
        }

        $feedback['result'] = true;
        $feedback['message'] = 'Tarefa excluída com sucesso.';
      } catch (\Throwable $th) {
        $feedback['message'] = 'Houve um erro ao excluir tarefa. Tente novamente ou contacte o administrador do sistema.' . $th;
      }
    }
    return response()->json($feedback);
  }
}
