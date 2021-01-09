import { HTTPCODE } from "../utils/http_codes"

export class BasicResponse {
    status: BASIC_STATUS = BASIC_STATUS.ERROR;
    code: HTTPCODE = HTTPCODE.INTERNAL_SERVER_ERROR;
    error?: ErrorResponse;
    data?: any;

    constructor(status: BASIC_STATUS, code: HTTPCODE, error?: ErrorResponse, data?: any) {
        this.status = status;
        this.code = code;
        this.error = error;
        this.data = data;
    }
}

export enum BASIC_STATUS {
    SUCCESS = "Success",
    WARN = "Warn",
    ERROR = "Error"
}

export enum ERROR_CAUSE {
    VALIDATION = "Validation",
    GENERAL = "General",
    DB = "Database",
    API = "Api",
    UNKNOWN = "Unknown",
    AUTH = "Authentication"
}

export interface ErrorResponse {
    cause: ERROR_CAUSE;
    message: string;
}

export function createDataResponse(data: any, statusIn?: BASIC_STATUS, codeIn?: HTTPCODE) {
    let status: BASIC_STATUS, code: HTTPCODE;
    if (statusIn) {
        status = statusIn;
    } else {
        status = BASIC_STATUS.SUCCESS;
    }
    if (codeIn) {
        code = codeIn;
    } else {
        code = HTTPCODE.OK;
    }
    return new BasicResponse(status, code, undefined, data);
}

export function createErrorResponse(error: ErrorResponse, statusIn?: BASIC_STATUS, codeIn?: HTTPCODE) {
    let status: BASIC_STATUS, code: HTTPCODE;
    if (statusIn) {
        status = statusIn;
    } else {
        status = BASIC_STATUS.ERROR;
    }
    if (codeIn) {
        code = codeIn;
    } else {
        code = HTTPCODE.BAD_REQUEST;
    }
    return new BasicResponse(status, code, error);
}