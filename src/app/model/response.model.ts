export interface Response {
    PID?: string;
    code: number;
    message?: string;
    error?: any;
}

export interface DetailResponse<T> extends Response {
    result?: T;
}

export interface ListResponse<T> extends Response {
    result?: T[];
    total: number;
}
