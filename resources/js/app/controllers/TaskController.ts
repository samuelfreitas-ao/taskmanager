import { HttpClient } from '../../libs/http/http-client'
import { IPostResponse } from '../types/http'
import { ITask } from '../types/task'

const url = (path?: string) => `/tasks${path ?? ''}`

export class TaskController {
  static async create(task: ITask): Promise<IPostResponse> {
    let feedback = this.validate(task)
    if (feedback.result) {
      const data = this.preparedformData(task)
      feedback = await HttpClient.post({
        uri: url(),
        data,
      })
    }
    return feedback
  }

  static async update(task: ITask): Promise<IPostResponse> {
    let feedback = this.validate(task)
    if (!task.id || task.id < 1) {
      feedback.message = 'Tarefa não encontrada.'
    } else if (feedback.result) {
      feedback = await HttpClient.update({
        uri: url(`/${task.id}`),
        data: task,
      })
    }
    return feedback
  }

  static async delete(
    id: number,
    soft: boolean = false,
  ): Promise<IPostResponse> {
    let feedback = { result: false, message: '', data: null }
    if (!id || id < 1) {
      feedback.message = 'Tarefa não encontrada.'
    } else {
      feedback = await HttpClient.delete({
        uri: url(`/${id}${soft ? '?soft=true' : ''}`),
      })
    }
    return feedback
  }

  private static validate(task: ITask) {
    let feedback = { result: false, message: '', data: null }
    if (!task.title || !task.title.trim()) {
      feedback.message = 'Informe o título da tarefa.'
    } else if (!task.description || !task.description.trim()) {
      feedback.message = 'Informe a descrição da tarefa.'
    } else if (!task.status || !task.status.trim()) {
      feedback.message = 'Informe o estado da tarefa.'
    } else {
      feedback.result = true
    }
    return feedback
  }

  private static preparedformData(data: object): FormData {
    const dataValues = Object.values(data)
    const formData = new FormData()
    Object.keys(data).forEach(function (key, i) {
      const value = dataValues[i]
      if (key == 'file') {
        const files = value
        for (let i = 0; i < files.length; i++) {
          formData.append('file[' + i + ']', files[i])
        }
      } else if (key != 'id') {
        formData.append(key, value)
      }
    })
    return formData
  }
}
