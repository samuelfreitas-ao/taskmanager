import { AxiosResponse } from "axios";
import { IGetParams, IHttpResponse, IPostParams } from "../../app/types/http";
import api from "../services/api";

export class HttpClient {
    static async get({ uri }: IGetParams): Promise<IHttpResponse> {
        let httpResponse: IHttpResponse;
        try {
            const response = await api.get(uri);
            httpResponse = {
                data: response.data,
                message: response.data?.message,
                result: response.data?.result ?? true,
                status: response.status,
            };
        } catch (error: any) {
            httpResponse = this.handleError(error);
        }
        return httpResponse;
    }

    static async post({ uri, data }: IPostParams): Promise<IHttpResponse> {
        let httpResponse: IHttpResponse;
        try {
            const response = await api.post(uri, data);
            httpResponse = this.handleResponse(response);
        } catch (error: any) {
            httpResponse = this.handleError(error);
        }
        return httpResponse;
    }

    static async delete({ uri }: IGetParams): Promise<IHttpResponse> {
        let httpResponse: IHttpResponse;
        try {
            const response = await api.delete(uri);
            httpResponse = this.handleResponse(response);
        } catch (error: any) {
            httpResponse = this.handleError(error);
        }
        return httpResponse;
    }

    static async update({ uri, data }: IPostParams): Promise<IHttpResponse> {
        let httpResponse: IHttpResponse;
        try {
            const response = await api.put(uri, data);
            httpResponse = this.handleResponse(response);
        } catch (error: any) {
            httpResponse = this.handleError(error);
        }
        return httpResponse;
    }

    private static handleResponse(response: AxiosResponse): IHttpResponse {
        return {
            data: response.data.data,
            message: response.data.message,
            result: response.data.result,
            status: response.status,
        };
    }

    private static handleError(error: any): IHttpResponse {
        let message: string;
        let status: number;
        const response = error.response;

        if (response?.statusText) {
            status = response.status;
            message = `${response.data.message}${
                response.data.file ? ` on file: ${response.data.file}` : ""
            }${response.data.line ? `, on line: ${response.data.line}` : ""}${
                status === 404
                    ? ' <a class"btn btn-blue">Iniciar sessão novamente</a>'
                    : ""
            }`;
        } else {
            status = 500;
            if (error?.code === "ERR_NETWORK") {
                message = "Não foi possível conectar-se ao servidor.";
            } else {
                message = `${error.message}`;
            }
        }
        return { status, result: false, message, data: null };
    }
}
