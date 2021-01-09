import express from "express";
import { getMeterById } from "./lib/meter/meterSvc";
import { addProfileSvc, findProfileSvc } from "./lib/profile/profilesvc";
import { generalApiCall, apiCallParamOnly } from "./utils/api_utils";

export const routerMain = express.Router();

routerMain.route('/profile')
    .get((req, res) => { generalApiCall(req, res, findProfileSvc); })
    .post((req, res) => { generalApiCall(req, res, addProfileSvc); });

routerMain.route('/meter')
    .get((req, res) => { generalApiCall(req, res, getMeterById); })
    .post((req, res) => { generalApiCall(req, res, getMeterById); });