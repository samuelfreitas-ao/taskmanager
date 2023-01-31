<?php

namespace App\Http\Requests;

use App\Models\Task;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class TaskUpdateRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    $id = request()->route('task');
    return [
      'title' => [
        'required',
        'min:5',
        'string',
        Rule::unique(Task::class)->ignore($id)
      ],
      'description' => 'required|string',
      'status' => 'required|string'
    ];
  }

  public function failedValidation(Validator $validator)
  {
    throw new ValidationException(
      $validator,
      response()->json([
        'result' => false,
        'message' => $validator->errors()->first(),
        'data' => null
      ])
    );
  }
}
