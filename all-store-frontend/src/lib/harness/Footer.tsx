import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "auto",
    backgroundColor: "#2b2b2b",
    color: "white",
    padding: 10,
    marginTop: 15,
  },
});

function Footer() {
  const classes = useStyles();
  return <Typography className={classes.root}>AllStore 2021</Typography>;
}

export default Footer;
