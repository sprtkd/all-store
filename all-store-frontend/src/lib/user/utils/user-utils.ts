import { UiUser, User } from "../models/user-model";
import * as yup from 'yup';

export function createUser(email: string, password: string, name?: string, contact?: string) {
    let newUser: User = {
        contact: contact ? contact : '',
        email: email,
        name: name ? name : '',
        password: password,
        username: email.split("@")[0]
    }
    return newUser;
}

export const loginValidationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const registerValidationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password'),
    name: yup
        .string()
        .min(2, 'Name is too short')
        .max(50, 'Name is too big')
        .required('Name is required'),
    contact: yup.string()
        .required()
        .matches(/^[0-9]+$/, "Contact must be only digits")
        .min(10, 'Contact must be exactly 10 digits')
        .max(10, 'Contact must be exactly 10 digits'),
});

export function setUserInContext(userContext: any, loggedInUser: any) {
    let storedLoginUser: UiUser = {
        username: loggedInUser.user.username,
        auth: loggedInUser.token,
        isLoggedIn: true,
        email: loggedInUser.user.email
    }
    userContext.setValue(storedLoginUser);
    setUserInLocal(storedLoginUser);
}

const LOCALSTORAGE_USER_KEY = "loggedInUser";

function setUserInLocal(loggedInUser: any) {
    localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(loggedInUser));
}

export function getUserInLocal(): UiUser {
    let loggedInUser = localStorage.getItem(LOCALSTORAGE_USER_KEY);
    if (loggedInUser) {
        return JSON.parse(loggedInUser);
    } else {
        return {
            isLoggedIn: false,
            username: "",
            auth: "",
            email: ""
        };
    }
}

export function logoutUser() {
    localStorage.removeItem(LOCALSTORAGE_USER_KEY);
    return getUserInLocal();
}