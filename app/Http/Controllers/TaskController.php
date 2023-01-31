<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use stdClass;

class TaskController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
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

      return response()->json([
        'result' => true,
        'message' => 'Tarefa cadastrada com sucesso.',
        'data' => new TaskResource($task)
      ]);
    } catch (\Throwable $th) {
      return response()->json([
        'result' => false,
        'message' => 'Erro ao cadastrar tarefa.',
        'data' => null
      ]);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $feedback = null;
    $task = Task::find($id);
    if ($task) {
      $task->load('files');
      $feedback = new TaskResource($task);
    } else {
      $feedback = response()->json([
        'result' => false,
        'message' => 'Tarefa não encontrada.',
        'data' => null
      ]);
    }
    return $feedback;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(TaskUpdateRequest $request, $id)
  {
    $feedback = ['result' => false, 'message' => '', 'data' => null];

    $file = $request->file;
    if (!$task = Task::find($id)) {
      $feedback['message'] = 'Tarefa não encontrada.';
    } else {
      try {
        $task->title = $request->title;
        $task->description = $request->description;
        $task->status = $request->status;
        $task->save();

        if ($file) {
          $data = new stdClass();
          $data->file = $file;
          $data->task_id = $task->id;
          FileController::upload($data);
        }

        $task->load('files');

        $feedback['result'] = true;
        $feedback['message'] = 'Tarefa actualizada com sucesso.';
        $feedback['data'] = new TaskResource($task);
      } catch (\Throwable $th) {
        $feedback['message'] = 'Houve um erro ao actualizar tarefa. Tente novamente ou contacte o administrador do sistema.';
      }
    }
    return response()->json($feedback);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
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
