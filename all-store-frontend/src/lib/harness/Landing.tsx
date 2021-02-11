import BigText from "../microui/big-appname";
import BigSearch from "../microui/big-search";

import { makeStyles } from "@material-ui/core";
import ProgressContext from "./ProgressContext";

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
      <BigText namestring={'AllStore'} />
      <br />
      <BigSearch />
      {/* <ProgressContext.Consumer>
        {({ isLoading, setValue }) => (
          <button
            style={{ marginBottom: "20px" }}
            onClick={() => setValue(!isLoading)}
          >
            toggle loader
          </button>
        )}
      </ProgressContext.Consumer> */}
    </div>
  );
}

export default Landing;
