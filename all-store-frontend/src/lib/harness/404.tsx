import BigText from "../microui/big-appname";
import { Button, makeStyles, Typography } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        textAlign: "center",
        margin: "auto",
        padding: 5,
        paddingTop: 100,
        paddingBottom: 50,
    },
});

function Page404() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <BigText namestring={'404'} />
            <br />
            <Typography variant="h5" gutterBottom>
                There is nothing here.
                <br />
                You can go to our Home.
            </Typography>
            <br />
            <Button variant="contained" color="primary" size="large" startIcon={<HomeIcon />} component={Link} to={'/'}>
                Home
            </Button>
        </div>
    );
}

export default Page404;
