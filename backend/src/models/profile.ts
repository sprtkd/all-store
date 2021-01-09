export class Profile {
    _id: any;
    name: string;
    email: string;
    token: string;

    constructor(name: string, email: string, token: string) {
        this.name = name;
        this.email = email;
        this.token = token;
    }
}