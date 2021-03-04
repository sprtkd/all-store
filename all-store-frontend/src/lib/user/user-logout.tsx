import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import ProgressContext from "../harness/ProgressContext";
import ToastContext from "../harness/ToastContext";
import { logoutUser } from "./utils/user-utils";

const useStyles = makeStyles({
  root: {
    fontSize: 15,
    margin: "auto",
  },
});

export default function UserLogout() {
  let progressBar = useContext(ProgressContext);
  let toastContext = useContext(ToastContext);
  const history = useHistory();
  progressBar.setValue(true);
  const classes = useStyles();
  logoutUser();
  history.push("/");
  history.go(0);
  toastContext.setValue({
    severity: "success",
    state: true,
    text: "Successfully Logged Out",
  });
  return <div className={classes.root}>Logging out</div>;
}
