import { createErrorResponse, ErrorResponse } from "../models/response";
import { HTTPCODE } from "./http_codes";
import { ERROR_CAUSE } from "../models/response";
import { errorLog } from "./logging_util";

export class AppError extends Error {
    statusCode: number = HTTPCODE.OK;
    message: string;
    cause: ERROR_CAUSE;
    constructor(message: string, cause?: ERROR_CAUSE, statusCode?: HTTPCODE) {
        super();
        if (statusCode) {
            this.statusCode = statusCode;
        } else {
            this.statusCode = HTTPCODE.BAD_REQUEST;
        }

        if (cause) {
            this.cause = cause
        } else {
            this.cause = ERROR_CAUSE.GENERAL;
        }
        this.message = message;
        errorLog(this);
    }
}

export const handleError = (err: any, res: any) => {
    let { statusCode, message, cause } = err;
    if (!statusCode) {
        statusCode = HTTPCODE.INTERNAL_SERVER_ERROR;
    }
    if (!message) {
        message = "Server Error";
    }
    if (!cause) {
        cause = ERROR_CAUSE.UNKNOWN;
    }

    let errResp: ErrorResponse = { cause: cause, message: message }
    let returnResp = createErrorResponse(errResp, undefined, statusCode);
    res.status(statusCode).json(returnResp);
};

export function throwError(message: string, cause?: ERROR_CAUSE, statusCode?: HTTPCODE) {
    throw new AppError(message, cause, statusCode);
}

export function handle404(res: any) {
    let statusCode = HTTPCODE.NOT_FOUND;
    let errResp: ErrorResponse = { cause: ERROR_CAUSE.API, message: "Invalid URI or Method" }
    let returnResp = createErrorResponse(errResp, undefined, statusCode);
    res.status(statusCode).json(returnResp);
}