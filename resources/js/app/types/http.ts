export type IPostParams = {
    uri: string;
    data?: any;
    callback?(response: any): any;
    config?: {};
};

export type IGetParams = {
    uri: string;
    callback?(response: any): any;
    config?: {};
};

export type IPostResponse = {
    result: boolean;
    message: string;
    data: any;
};

export type IHttpResponse = {
    data: any;
    message: string;
    result: boolean;
    status: number;
};
