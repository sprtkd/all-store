import { Db, MongoClient, MongoError } from "mongodb";
import { throwError } from "./error";
import { ERROR_CAUSE } from "../models/response";
import { DB_NAME, DB_URI } from "../settings";

export const DB_OPTS = { useNewUrlParser: true, useUnifiedTopology: true }

export var dbConnection: Db;

export async function createDBConnection() {
    try {
        let client = await MongoClient.connect(DB_URI, DB_OPTS);
        dbConnection = client.db(DB_NAME);
    } catch (error) {
        handleMongoError(error, "connect to DB");
    }
}

export function handleMongoError(err: MongoError, type: string) {
    if (err) {
        throwError("DB Error: Unable to " + type + ". Reason: " + err, ERROR_CAUSE.DB);
    }
}