import { handleError } from "./error";
import { createDataResponse } from "../models/response";

export function generalApiCall(req: any, res: any, callback: any) {
    callback(req.body).then(
        (data: any) => { res.send(createDataResponse(data)); },
        (err: any) => {
            handleError(err, res);
            res.send();
        }
    )
}

export function apiCallParamOnly(param: any, res: any, callback: any) {
    callback(param).then(
        (data: any) => { res.send(createDataResponse(data)); },
        (err: any) => {
            handleError(err, res);
            res.send();
        }
    )
}