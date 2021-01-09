export class Incident {
    _id: any;
    type: INCIDENT_TYPE;
    message: string;
    data: any;

    constructor(data: any, message: string, type?: INCIDENT_TYPE) {
        this.data = data;
        this.message = message;
        if (type) {
            this.type = type;
        } else {
            this.type = INCIDENT_TYPE.GENERAL;
        }
    }
}

export enum INCIDENT_TYPE {
    UNAUTH = "unauth",
    GENERAL = "general"
}

export class UnauthData {
    email: string;
    timestamp: Date = new Date();
    constructor(email: string) {
        this.email = email;
    }
}