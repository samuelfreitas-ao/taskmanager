<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
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
        $tasks = Task::all();
        $tasks->load('files');
        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $feedback = ['result' => false, 'message' => '', 'data' => null];

        $title = trim($request->title);
        $description = trim($request->description);
        $status = trim($request->status);
        $file = $request->file;
        if (!$title) {
            $feedback['message'] = 'Informe o título da tarefa.';
        } else if (!$description) {
            $feedback['message'] = 'Adicione uma descrição na tarefa.';
        } else if (!$status) {
            $feedback['message'] = 'Selecione o estado da tarefa.';
        } else {
            try {
                $task = new Task();
                $task->title = $title;
                $task->description = $description;
                $task->status = $status;
                $task->save();

                if ($file) {
                    //Uplaod and store a file in database
                    $data = new stdClass();
                    $data->file = $file;
                    $data->task_id = $task->id;
                    FileController::upload($data);
                }

                $task->load('files');

                $feedback['result'] = true;
                $feedback['message'] = 'Tarefa cadastrada com sucesso.';
                $feedback['data'] = $task;
            } catch (\Throwable $th) {
                $feedback['message'] = 'Houve um erro ao cadastrar tarefa. Tente novamente ou contacte o administrador do sistema.';
            }
        }
        return response()->json($feedback);
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
            $feedback = response()->json(['result' => false, 'message' => 'Tarefa não encontrada.', 'data' => null]);
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
    public function update(Request $request, $id)
    {
        $feedback = ['result' => false, 'message' => '', 'data' => null];

        $title = trim($request->title);
        $description = trim($request->description);
        $status = trim($request->status);
        $file = $request->file;
        if (!$title) {
            $feedback['message'] = 'Informe o título da tarefa.';
        } else if (!$description) {
            $feedback['message'] = 'Adicione uma descrição na tarefa.';
        } else if (!$status) {
            $feedback['message'] = 'Selecione o estado da tarefa.';
        } else if (!$task = Task::find($id)) {
            $feedback['message'] = 'Tarefa não encontrada.';
        } else {
            try {
                $task->title = $title;
                $task->description = $description;
                $task->status = $status;
                $task->save();

                if ($file) {
                    //Uplaod and store a file in database
                    $data = new stdClass();
                    $data->file = $file;
                    $data->task_id = $task->id;
                    FileController::upload($data);
                }

                $task->load('files');

                $feedback['result'] = true;
                $feedback['message'] = 'Tarefa actualizada com sucesso.';
                $feedback['data'] = $task;
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
                if ($softDelete) {
                    $task->softDeletes();
                } else {
                    $task->delete();
                }
                $feedback['result'] = true;
                $feedback['message'] = 'Tarefa excluída com sucesso.';
            } catch (\Throwable $th) {
                $feedback['message'] = 'Houve um erro ao excluir tarefa. Tente novamente ou contacte o administrador do sistema.';
            }
        }
        return response()->json($feedback);
    }
}
