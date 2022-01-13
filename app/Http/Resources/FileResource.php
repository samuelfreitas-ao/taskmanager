<?php

namespace App\Http\Resources;

use App\Http\Controllers\FileController;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'path' =>$this->path,
            'url' =>FileController::uploadLink($this->path),
            'type' => $this->type,
            'task_id' => $this->task_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'task' => new TaskResource($this->whenLoaded('task')),
        ];
    }
}
