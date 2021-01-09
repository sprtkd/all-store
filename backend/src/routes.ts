import express from "express";
import { addProfileSvc, findProfileSvc } from "./lib/profile/profilesvc";
import { generalApiCall, apiCallParamOnly } from "./utils/api_utils";

export const routerMain = express.Router();

routerMain.route('/profile')
    .get((req, res) => { generalApiCall(req, res, findProfileSvc); })
    .post((req, res) => { generalApiCall(req, res, addProfileSvc); });


// TODO
routerMain.route('/categories')
    .get((req, res) => { generalApiCall(req, res, findProfileSvc); })
    .post((req, res) => { generalApiCall(req, res, findProfileSvc); });