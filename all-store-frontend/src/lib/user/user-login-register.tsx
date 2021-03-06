import { Paper, makeStyles, Typography, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useFormik } from "formik";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RepeatIcon from "@material-ui/icons/Repeat";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneIcon from "@material-ui/icons/Phone";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  loginValidationSchema,
  registerValidationSchema,
  setUserInContext,
} from "./utils/user-utils";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { red } from "@material-ui/core/colors";
import { loginUserApi, registerUserApi } from "./utils/user-api";
import ProgressContext from "../harness/ProgressContext";
import UserContext from "./utils/UserContext";
import ToastContext from "../harness/ToastContext";

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
  inputField: {
    marginTop: 15,
    width: "100%",
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

function UserLoginDiv() {
  let progressBar = useContext(ProgressContext);
  let userContext = useContext(UserContext);
  let toastContext = useContext(ToastContext);
  function onLogin(msg: string, stat: boolean) {
    toastContext.setValue({
      severity: stat ? "success" : "error",
      state: true,
      text: msg,
    });
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      progressBar.setValue(true);
      loginUserApi(values.email, values.password).then(function (response) {
        if (response.loggedin) {
          onLogin(response.msg, true);
          setUserInContext(userContext, response);
        } else {
          onLogin(response.msg, false);
        }
        progressBar.setValue(false);
      });
    },
  });
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant="outlined" className={classes.inputField}>
          <OutlinedInput
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            }
            placeholder="Email | xyz@abc.com"
            className={classes.inputItem}
          />
          <FormHelperText id="email-helper-text">
            {formik.touched.email && formik.errors.email}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" className={classes.inputField}>
          <OutlinedInput
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            startAdornment={
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Password"
            className={classes.inputItem}
          />
          <FormHelperText id="email-helper-text">
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </FormControl>
        <br />
        <br />
        <br />

        <Button
          variant="contained"
          size="medium"
          color="primary"
          startIcon={
            formik.isValid ? (
              <ExitToAppIcon />
            ) : (
              <ErrorOutlineIcon style={{ color: red[500] }} />
            )
          }
          className={classes.actionButton}
          type="submit"
        >
          Login
        </Button>
      </form>
      <Typography>
        <Link href="#">Forgot Password?</Link>
      </Typography>
    </div>
  );
}

function UserRegisterDiv(props: { setLoginDiv: any }) {
  let progressBar = useContext(ProgressContext);
  let toastContext = useContext(ToastContext);
  function onRegister(msg: string, stat: boolean) {
    toastContext.setValue({
      severity: stat ? "success" : "error",
      state: true,
      text: msg,
    });
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      progressBar.setValue(true);
      registerUserApi(
        values.email,
        values.password,
        values.name,
        values.contact
      ).then(function (response) {
        if (response.registered) {
          onRegister(response.msg, true);
          props.setLoginDiv(true);
        } else {
          onRegister(response.msg, false);
        }
        progressBar.setValue(false);
      });
    },
  });
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant="outlined" className={classes.inputField}>
          <OutlinedInput
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            }
            placeholder="Name"
            className={classes.inputItem}
          />
          <FormHelperText id="name-helper-text">
            {formik.touched.name && formik.errors.name}
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined" className={classes.inputField}>
          <OutlinedInput
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            startAdornment={
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            }
            placeholder="Email | xyz@abc.com"
            className={classes.inputItem}
          />
          <FormHelperText id="email-helper-text">
            {formik.touched.email && formik.errors.email}
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined" className={classes.inputField}>
          <OutlinedInput
            id="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            startAdornment={
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            }
            placeholder="Contact"
            className={classes.inputItem}
          />
          <FormHelperText id="contact-helper-text">
            {formik.touched.contact && formik.errors.contact}
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined" className={classes.inputField}>
          <OutlinedInput
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            startAdornment={
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Password"
            className={classes.inputItem}
          />
          <FormHelperText id="password-helper-text">
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined" className={classes.inputField}>
          <OutlinedInput
            id="confirmPassword"
            type={values.showConfirmPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            startAdornment={
              <InputAdornment position="start">
                <RepeatIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirmPassword visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Confirm Password"
            className={classes.inputItem}
          />
          <FormHelperText id="confirmPassword-helper-text">
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </FormHelperText>
        </FormControl>
        <br />
        <br />
        <br />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          startIcon={
            formik.isValid ? (
              <PersonAddIcon />
            ) : (
              <ErrorOutlineIcon style={{ color: red[500] }} />
            )
          }
          className={classes.actionButton}
          type="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

function UserLoginRegister() {
  const classes = useStyles();
  const [isLogin, setLogin] = React.useState(true);
  const handleClickLoginToggle = () => {
    setLogin(!isLogin);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Avatar className={classes.media}>
          <AccountCircleIcon className={classes.mediaIcon} />
        </Avatar>
        <br />
        <Typography variant="h4" gutterBottom className={classes.appname}>
          {isLogin ? "Login" : "Register"}
        </Typography>
      </div>
      <div className={classes.content}>
        {isLogin ? (
          <UserLoginDiv />
        ) : (
          <UserRegisterDiv setLoginDiv={setLogin} />
        )}
        <br />
        <Button size="medium" color="primary" onClick={handleClickLoginToggle}>
          {isLogin ? "Not yet Registered? Go here" : "Login Here"}
        </Button>
      </div>
    </Paper>
  );
}

export default UserLoginRegister;
