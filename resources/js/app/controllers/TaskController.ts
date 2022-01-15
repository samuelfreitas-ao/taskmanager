import { HttpClient } from "../../libs/http/http-client";
import { ITask } from "../types/task";

export class TaskController {
    static async create(taks: ITask): Promise<any> {
        return await HttpClient.post({ uri: '/tasks/create', data: taks })
    }
}
