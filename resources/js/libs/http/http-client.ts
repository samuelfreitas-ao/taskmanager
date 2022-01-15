import { IGetParams, IPostParams } from "../../app/types/http";
import api from "../services/api";

const NET_ERR = {
    message: 'Erro ao conectar-se ao servidor'
    , result: false
    , data: null
    , error: true
}

export class HttpClient {
    static async post(params: IPostParams) {
        const { uri, callback, data, config } = params
        try {
            const response = await api.post(uri, data, config);
            if (callback) {
                callback(response)
            }
            return response
        } catch (error: any) {
            if (callback) {
                if (!error.response) {
                    callback(NET_ERR)
                } else {
                    callback(error.response)
                }
            }
            if (!error.response) {
                return NET_ERR
            }
            return error.response
        }
    }

    static async get(params: IGetParams) {
        const { uri, callback, config } = params
        try {
            const response = await api.get(uri, config);

            if (callback) {
                callback(response)
            }
            return response
        } catch (error: any) {
            if (callback) {
                if (!error.response) {
                    callback(NET_ERR)
                } else {
                    callback(error.response)
                }
            }

            if (!error.response) {
                return NET_ERR
            }
            return error.response
        }
    }
}
