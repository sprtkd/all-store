import {
    Card,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
    Button,
    Chip,
    Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        width: 200,
        borderRadius: 20,
        background: "#f0f0f0",
        boxShadow: "6px 6px 10px #d1d1d1, -6px -6px 10px #ffffff",
        "&:hover": {
            background: "#ffffff",
            boxShadow: "4px 4px 5px #d1d1d1, -4px -4px 5px #ffffff",
        },
        "&:active": {
            background: "#f8f8f8",
            boxShadow: "1px 1px 2px #d1d1d1, -1px -1px 2px #ffffff",
        },
        cursor: "pointer",
        margin: 15,
    },
    content: {
        paddingTop: 10,
        textAlign: "center",
    },
    media: {
        margin: "auto",
        marginTop: 23,
        height: 100,
        width: 100,
    },
    appname: {
        fontWeight: 700,
        color: "#5e5e5e",
        fontSize: 20,
        height: 50,
        overflow: "hidden",
        marginBottom: 15,
    },
});


function UserLogin() {
    const classes = useStyles();
    return (
        <Card className={classes.root}>

            <CardContent className={classes.content}>
                <Typography variant="h5" gutterBottom className={classes.appname}>
                    Login
                </Typography>
            </CardContent>
        </Card>
    );
}

export default UserLogin;
