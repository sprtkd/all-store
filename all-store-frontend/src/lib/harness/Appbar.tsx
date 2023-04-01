import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import InputBase from "@material-ui/core/InputBase";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { Button, LinearProgress } from "@material-ui/core";
import SideDrawer from "./SideDrawer";
import ProgressContext from "./ProgressContext";
import { AccountCircle } from "@material-ui/icons";
import UserContext from "../user/utils/UserContext";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    titleDiv: {
      flexGrow: 1,
      display: "none",

      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    title: {
      color: "white",
      textTransform: "none",
      fontSize: 20,
    },
    searchIcon: {
      color: "white",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "15ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

export default function Appbar() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    sideBarState: false,
  });
  console.log(useLocation().pathname);
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setValues({ ...values, sideBarState: open });
  };
  return (
    <div className={classes.root}>
      <SideDrawer
        sidebarState={values.sideBarState}
        callbackSidebarToggle={toggleDrawer}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.titleDiv}>
            <Button
              className={classes.title}
              component={Link}
              to={"/"}
              startIcon={<LocalMallIcon />}
            >
              AllStore
            </Button>
          </div>
          <div>
            {useLocation().pathname === "/" ? null : (
              <IconButton
                className={classes.searchIcon}
                component={Link}
                to="/"
              >
                <SearchIcon />
              </IconButton>
            )}
          </div>
          <ProfileIcon />
        </Toolbar>
      </AppBar>
      <ProgressContext.Consumer>
        {({ isLoading, setValue }) => isLoading && <LinearProgress />}
      </ProgressContext.Consumer>
    </div>
  );
}

function ProfileIcon() {
  return (
    <div>
      <UserContext.Consumer>
        {({ user, setValue }) =>
          user.isLoggedIn && (
            <IconButton color="inherit" component={Link} to="/user">
              <AccountCircle />
            </IconButton>
          )
        }
      </UserContext.Consumer>
      <UserContext.Consumer>
        {({ user, setValue }) =>
          !user.isLoggedIn && (
            <Button color="inherit" component={Link} to="/user">
              Login
            </Button>
          )
        }
      </UserContext.Consumer>
    </div>
  );
}
