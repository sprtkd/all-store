import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import ProgressContext from "../harness/ProgressContext";
import ToastContext from "../harness/ToastContext";
import { logoutUser } from "./utils/user-utils";
import UserContext from "./utils/UserContext";

const useStyles = makeStyles({
  root: {
    fontSize: 15,
    margin: "auto",
  },
});

export default function UserLogout() {
  let progressBar = useContext(ProgressContext);
  let toastContext = useContext(ToastContext);
  let userContext = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  if (userContext.user.isLoggedIn) {
    progressBar.setValue(true);
    let loggedOutUser = logoutUser();
    history.push("/");
    toastContext.setValue({
      severity: "success",
      state: true,
      text: "Successfully Logged Out",
    });
    userContext.setValue(loggedOutUser);
    progressBar.setValue(false);
  } else {
    history.push("/");
    toastContext.setValue({
      severity: "error",
      state: true,
      text: "No User Logged In",
    });
  }

  return <div className={classes.root}>Logging out</div>;
}
