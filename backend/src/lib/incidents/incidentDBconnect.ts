import { Incident, INCIDENT_TYPE } from '../../models/incident';
import { dbConnection, handleMongoError } from '../../utils/db_utils';
import { getDateXDays } from '../../utils/general_utils';

const INCIDENT_COLLECTION = "incidents";

export async function findUnAuthIncidents(email: string) {
    try {
        return await dbConnection.collection(INCIDENT_COLLECTION)
            .find<Incident>({ type: INCIDENT_TYPE.UNAUTH, 'data.email': email, 'data.timestamp': { $gte: getDateXDays(-1) } }).toArray();
    } catch (error) {
        handleMongoError(error, "find auth incident");
    }
}

export async function addUnAuthIncident(unauthIncident: Incident) {
    try {
        let res = await dbConnection.collection(INCIDENT_COLLECTION)
            .insertOne(unauthIncident);
        return (res.insertedCount > 0);
    } catch (error) {
        handleMongoError(error, "add auth incident");
    }
}