export interface User {
    username: string;
    name: string;
    email: string;
    contact: string;
    password: string;
}

export interface UiUser {
    isLoggedIn: boolean;
    username: string;
    auth: string;
}