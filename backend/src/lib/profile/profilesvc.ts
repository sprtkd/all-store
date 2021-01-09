import { Profile } from "../../models/profile";
import validator from 'validator';
import bcrypt from 'bcrypt';
import { throwError } from "../../utils/error";
import { ERROR_CAUSE } from "../../models/response";
import { HTTPCODE } from "../../utils/http_codes";
import { addProfile, findProfile } from "./profileDBconnect";
import { addAuthIncidentSvc, checkIfExceededUnauthLimit } from "../incidents/incidentMgrsvc";
const SALT_ROUNDS = 10;

export async function addProfileSvc(profileFromUI: Profile) {
    await validateNewProfile(profileFromUI);
    let newProfile = new Profile(profileFromUI.name, profileFromUI.email,
        bcrypt.hashSync(profileFromUI.token, SALT_ROUNDS));
    if (!await addProfile(newProfile)) {
        throwError("Failed to Add Profile to DB", ERROR_CAUSE.DB);
    }
    return newProfile;
}

export async function findProfileSvc(profileFromUI: Profile) {
    let isTokenReqd = validateProfileGetIsLogin(profileFromUI)
    let profileDB = await findProfile(profileFromUI.email);
    if (!profileDB || !(profileDB.token.length > 0)) {
        if (isTokenReqd) {
            throwError("Invalid Credentials.", ERROR_CAUSE.AUTH, HTTPCODE.UNAUTHORIZED);
        } else {
            throwError("Profile Not Found");
        }
    }
    if (profileDB && await checkIfExceededUnauthLimit(profileFromUI.email)) {
        throwError("Profile has been locked. Invalid password limit exceeded",
            ERROR_CAUSE.AUTH, HTTPCODE.UNAUTHORIZED);
    }
    if (profileDB && !isTokenReqd) { profileDB.token = ""; }
    if (profileDB && isTokenReqd) {
        if (!bcrypt.compareSync(profileFromUI.token, profileDB.token)) {

            await addAuthIncidentSvc(profileFromUI.email, "Invalid password");
            throwError("Invalid Credentials.", ERROR_CAUSE.AUTH, HTTPCODE.UNAUTHORIZED);
        }
    }
    return profileDB;
}

function validateProfileGetIsLogin(profileFromUI: Profile): boolean {
    if (!profileFromUI || !profileFromUI.email || !validator.isEmail(profileFromUI.email)) {
        throwError("Invalid Profile requested: Email invalid", ERROR_CAUSE.VALIDATION);
    }
    if (profileFromUI.token && validator.isLength(profileFromUI.name, { min: 1 })) {
        return true;
    }
    return false;
}

async function validateNewProfile(profileFromUI: Profile) {
    if (!profileFromUI) {
        throwError("Invalid Profile Object", ERROR_CAUSE.VALIDATION);
    }
    if (!profileFromUI.name || !validator.isLength(profileFromUI.name, { min: 2, max: 40 })
        || !validator.isAlphanumeric(profileFromUI.name)) {
        throwError("Invalid Name", ERROR_CAUSE.VALIDATION);
    }
    if (!profileFromUI.email || !validator.isEmail(profileFromUI.email)) {
        throwError("Invalid Email", ERROR_CAUSE.VALIDATION);
    }
    if (!profileFromUI.token || !validator.isLength(profileFromUI.token, { min: 5, max: 40 })) {
        throwError("Invalid Password", ERROR_CAUSE.VALIDATION);
    }
    if (await checkIfProfileExists(profileFromUI.email)) {
        throwError("Profile already exists");
    }
}

async function checkIfProfileExists(email: string): Promise<boolean> {
    let prof = await findProfile(email);
    if (prof && prof.token && prof.token.length > 0) {
        return true;
    }
    return false;
}