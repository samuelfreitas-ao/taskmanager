import { HttpClient } from "../../libs/http/http-client";
import { IPostResponse } from "../types/http";
import { ITask } from "../types/task";

export class TaskController {
    /**
     * Store a record on database
     *
     * @param task
     * @returns IPostResponse
     */
    static async create(task: ITask): Promise<IPostResponse> {
        let feedback = this.validate(task)
        if (feedback.result) {
            const data = this.preparedformData(task)
            const response = await HttpClient.post({ uri: `/tasks/create`, data })
            feedback = response.data
        }
        return feedback
    }

    /**
     * Upadate record on database
     *
     * @param task ITask
     * @returns IPostResponse
     */
    static async update(task: ITask): Promise<IPostResponse> {
        let feedback = this.validate(task)
        if (!task.id || task.id < 1) {
            feedback.message = 'Tarefa não encontrada.'
        } else if(feedback.result) {
            const data = this.preparedformData(task)
            const response = await HttpClient.post({ uri: `/tasks/${task.id}/update`, data })
            feedback = response.data
        }
        return feedback
    }

    /**
     * Delete a record on database
     *
     * @param id task id on database table
     * @param soft option to specify if delete soft or permantemently on db table
     * @returns IPostResponse
     */
    static async delete(id: number, soft: boolean = false): Promise<IPostResponse> {
        let feedback = { result: false, message: '', data: null }
        if (!id || id < 1) {
            feedback.message = 'Tarefa não encontrada.'
        } else {
            const response = await HttpClient.post({ uri: `/tasks/${id}/delete${soft && '?soft=true'}` })
            feedback = response.data
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
        }
        return feedback
    }

    private static preparedformData(data: object): FormData {
        const dataValues = Object.values(data);
        const formData = new FormData()
        Object.keys(data).forEach(function (key, i) {
            const value = dataValues[i]
            if (key == 'file') {
                const files = value
                for (let i = 0; i < files.length; i++) {
                    formData.append('file[' + i + ']', files[i])
                }
            } else {
                formData.append(key, value);
            }
        })
        return formData
    }
}
