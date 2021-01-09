import { AppError } from "./error";

export function serverLog(message: string) {
    console.log("[server]: " + message);
}

export function errorLog(err: AppError) {
    serverLog("Exception occurred: " + err.cause + " | " + err.message);
}