import BigAppName from "../microui/big-appname";
import BigSearch from "../microui/big-search";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "auto",
    padding: 5,
    paddingTop: 100,
    paddingBottom: 50,
  },
});

function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BigAppName />
      <br />
      <BigSearch />
    </div>
  );
}

export default Landing;
