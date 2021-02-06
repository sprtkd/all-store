import {
    Paper,
    makeStyles,
    Typography,
    Button,
} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from "react";
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        minHeight: 500,
        borderRadius: 20,
        background: "#f0f0f0",
        boxShadow: "6px 6px 10px #d1d1d1, -6px -6px 10px #ffffff",
        margin: "auto",
        marginTop: 30,
    },
    header: {
        paddingTop: 30,
        textAlign: "center",
    },
    content: {
        textAlign: "center",
        margin: 30
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
        color: "black"
    },
    appname: {
        fontWeight: 600,
        color: "#5e5e5e",
    },
    buttonLogin: {
        borderRadius: 20,
        width: "100%",
        padding: 10,
        marginBottom: 10
    },
    inputField: {
        background: "#f0f0f0",
        marginTop: 15,
        width: "100%",
        boxShadow: "inset 6px 6px 10px #d1d1d1, inset -6px -6px 10px #ffffff",
    }
});


function UserLogin() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop: string) => (event: { target: { value: any; }; }) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    return (
        <Paper className={classes.root}>

            <div className={classes.header}>
                <Avatar className={classes.media}>
                    <AccountCircleIcon className={classes.mediaIcon} />
                </Avatar>
                <br />
                <Typography variant="h4" gutterBottom className={classes.appname}>
                    Login
                </Typography>
            </div>
            <div className={classes.content}>
                <FormControl variant="outlined" className={classes.inputField}>

                    <OutlinedInput
                        id="email"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircleIcon />
                            </InputAdornment>
                        }
                        placeholder="Email | xyz@abc.com"
                    />
                </FormControl>

                <FormControl variant="outlined" className={classes.inputField}>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
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
                    />
                </FormControl>
                <br />
                <br />
                <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    startIcon={<VpnKeyIcon />}
                    className={classes.buttonLogin}
                >Login
                </Button>
                <Typography>
                    <Link href="#">
                        Forgot Password?
                    </Link>
                </Typography>
                <br />
                <Typography>
                    <Link href="#">
                        Not yet Registered?
                    </Link>
                </Typography>

            </div>
        </Paper>
    );
}

export default UserLogin;
