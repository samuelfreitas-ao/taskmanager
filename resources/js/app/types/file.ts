import { ITask } from "./task";

export type IFile = {
    id: number
    path: string
    url: string
    type: string
    task_id: string
    created_at: Date
    updated_at: Date
    deleted_at: Date
    task: ITask
}
