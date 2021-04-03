import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { getUserApi } from "./utils/user-api";
import React, { useContext, useEffect } from "react";
import ProgressContext from "../harness/ProgressContext";
import UserContext from "./utils/UserContext";
import ToastContext from "../harness/ToastContext";
import { createUser } from "./utils/user-utils";
import { generalToast } from "../utils/general-utils";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import UserChip from "../microui/user-chip";
import DevicesIcon from "@material-ui/icons/Devices";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { Skeleton } from "@material-ui/lab";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    minHeight: 500,
    borderRadius: 20,
    background: "#f0f0f0",
    boxShadow: "6px 6px 10px #d1d1d1, -6px -6px 10px #ffffff",
    margin: "auto",
    marginTop: 30,
    paddingBottom: 10,
  },
  header: {
    paddingTop: 30,
    textAlign: "center",
  },
  content: {
    textAlign: "center",
    margin: 30,
  },
  media: {
    margin: "auto",
    height: 80,
    width: 80,
    backgroundColor: "white",
    boxShadow: "6px 6px 10px #d1d1d1, -6px -6px 10px #ffffff",
  },
  mediaIcon: {
    margin: "auto",
    height: 70,
    width: 70,
    color: "black",
  },
  appname: {
    fontWeight: 600,
    color: "#5e5e5e",
  },
  actionButton: {
    borderRadius: 20,
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  icobutton: {
    boxShadow: "6px 6px 10px #d1d1d1, -6px -6px 10px #ffffff",
    margin: 10,
  },
  inputField: {
    marginTop: 15,
    width: "100%",
  },
  skeleton: {
    margin: "auto",
    borderRadius: 5,
  },
  inputItem: {
    background: "#f2f2f2",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "inset 6px 6px 10px #d1d1d1, inset -6px -6px 10px #ffffff",
    borderRadius: 25,
    "&:hover": {
      background: "#ffffff",
    },
  },
});

export default function UserProfile() {
  const classes = useStyles();
  let progressBar = useContext(ProgressContext);
  let userContext = useContext(UserContext);
  let toastContext = useContext(ToastContext);
  const [loggedInUser, setUser] = React.useState(createUser("", ""));
  useEffect(() => {
    progressBar.setValue(true);
    getUserApi(userContext.user.auth).then(function (response) {
      if (response && response.username) {
        setUser(response);
      } else {
        generalToast(toastContext, response, false);
      }
      progressBar.setValue(false);
    });
  }, []);

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Avatar className={classes.media}>
          <AccountCircleIcon className={classes.mediaIcon} />
        </Avatar>
        <br />
        <Typography variant="h4" gutterBottom className={classes.appname}>
          {loggedInUser.email.length > 0 ? (
            loggedInUser.name
          ) : (
            <Skeleton
              variant="rect"
              width={210}
              height={50}
              className={classes.skeleton}
            />
          )}
        </Typography>
        {loggedInUser.email.length > 0 ? (
          <UserChip name={loggedInUser.username} size="medium" />
        ) : (
          <Skeleton
            variant="rect"
            width={100}
            height={20}
            className={classes.skeleton}
          />
        )}
      </div>
      <div className={classes.content}>
        {loggedInUser.email.length > 0 ? (
          <Typography variant="h6" gutterBottom>
            <Button
              className={classes.actionButton}
              variant="outlined"
              size="medium"
              startIcon={<MailIcon />}
            >
              {loggedInUser.email}
            </Button>
            <br />
            <Button
              className={classes.actionButton}
              variant="outlined"
              size="medium"
              startIcon={<PhoneIcon />}
            >
              {loggedInUser.contact}
            </Button>
          </Typography>
        ) : (
          <Skeleton
            variant="rect"
            width={200}
            height={50}
            className={classes.skeleton}
          />
        )}

        <br />
        <div>
          <Tooltip title="This Device" aria-label="add">
            <IconButton
              className={classes.icobutton}
              component={Link}
              to="/device"
            >
              <DevicesIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="My Apps" aria-label="add">
            <IconButton
              className={classes.icobutton}
              component={Link}
              to="/my-apps"
            >
              <AssignmentIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Wishlist" aria-label="add">
            <IconButton
              className={classes.icobutton}
              component={Link}
              to="/wishlist"
            >
              <LibraryAddCheckIcon />
            </IconButton>
          </Tooltip>
        </div>

        <br />
        <br />
        <Button
          className={classes.actionButton}
          variant="contained"
          size="medium"
          color="primary"
          startIcon={<CancelIcon />}
          href="/logout"
        >
          Logout
        </Button>
        <br />
        <Button
          className={classes.actionButton}
          variant="contained"
          size="medium"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Delete Account
        </Button>
      </div>
    </Paper>
  );
}
