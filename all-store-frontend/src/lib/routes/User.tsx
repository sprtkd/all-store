import UserLoginRegister from "../user/user-login-register";
import UserProfile from "../user/user-profile";
import UserContext from "../user/utils/UserContext";

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
