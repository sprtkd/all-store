import { Incident, INCIDENT_TYPE, UnauthData } from "../../models/incident";
import { ERROR_CAUSE } from "../../models/response";
import { throwError } from "../../utils/error";

import { addUnAuthIncident, findUnAuthIncidents } from './incidentDBconnect';

const UNAUTH_SAMEDAY_LIMIT = 5;

export async function addAuthIncidentSvc(email: string, type: string) {
    let unauthData: UnauthData = new UnauthData(email);
    let unauthIncident: Incident = new Incident(unauthData, type, INCIDENT_TYPE.UNAUTH);
    if (!await addUnAuthIncident(unauthIncident)) {
        throwError("Failed to Add Incident to DB", ERROR_CAUSE.DB);
    }
}

export async function checkIfExceededUnauthLimit(email: string) {
    let incidents = await findUnAuthIncidents(email);
    if (incidents && incidents.length >= UNAUTH_SAMEDAY_LIMIT) {
        return true;
    }
    return false;
}

