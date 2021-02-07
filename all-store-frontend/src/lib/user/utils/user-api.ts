import { createUser } from "./user-utils";
import axios from "axios";

export async function loginUserApi(email: string, password: string) {
    alert(JSON.stringify(createUser(email, password), null, 2));
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export function registerUserApi(email: string, password: string, name: string, contact: string) {
    alert(JSON.stringify(createUser(email, password, name, contact), null, 2));
}