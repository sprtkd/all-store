import UserLoginRegister from "./user-login-register";
import UserProfile from "./user-profile";
import UserContext from "./utils/UserContext";

export default function UserPage() {
    return (<div>
        <UserContext.Consumer>
            {({ user, setValue }) => (
                user.isLoggedIn && <UserProfile />
            )}
        </UserContext.Consumer>
        <UserContext.Consumer>
            {({ user, setValue }) => (
                !user.isLoggedIn && < UserLoginRegister />
            )}
        </UserContext.Consumer>
    </div>)
}
