import { createUser } from "./user-utils";
import axios from "axios";
import { BACKEND_API } from "../../utils/env";
import { axiosErrorHandler } from "../../utils/error-handler";

const LOGIN_URI = "/user/login";
const REGISTER_URI = "/user/register";

const SUCCESS_LOGIN = "Successfully logged in.";
const FAILED_LOGIN = "Failed to login."

const SUCCESS_REGISTER = "Successfully registered: ";
const FAILED_REGISTER = "Registration Failed."

export async function loginUserApi(email: string, password: string) {
    let loginUser = createUser(email, password);
    try {
        const response = await axios.post(BACKEND_API + LOGIN_URI, loginUser);
        console.log(SUCCESS_LOGIN);
        return { loggedin: true, msg: SUCCESS_LOGIN, user: response.data, token: response.headers['access-token'] };
    } catch (error) {
        return { loggedin: false, msg: axiosErrorHandler(error, FAILED_LOGIN) };

    }
}

export async function registerUserApi(email: string, password: string, name: string, contact: string) {

    let registerUser = createUser(email, password, name, contact);
    try {
        const response = await axios.post(BACKEND_API + REGISTER_URI, registerUser);
        console.log(SUCCESS_REGISTER);
        return { registered: true, msg: SUCCESS_REGISTER + response.data.username };
    } catch (error) {
        return { registered: false, msg: axiosErrorHandler(error, FAILED_REGISTER) };

    }
}