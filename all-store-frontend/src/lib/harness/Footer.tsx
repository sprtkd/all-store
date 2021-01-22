import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "auto",
    backgroundColor: "#454545",
    color: "white",
    padding: 15,
    marginTop: 15,
    boxShadow: " 0px -5px 15px 1px rgba(0,0,0,0.25)",
  },
});

function Footer() {
  const classes = useStyles();
  return <Typography className={classes.root}>AllStore 2021</Typography>;
}

export default Footer;
