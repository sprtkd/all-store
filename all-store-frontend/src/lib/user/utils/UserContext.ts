import React from "react";
import { UiUser } from "../models/user-model";

const UserContext = React.createContext({
    user: {
        isLoggedIn: false,
        username: "",
        auth: "",
        email: ""
    },
    setValue: (val: UiUser) => { },
});

export default UserContext;
