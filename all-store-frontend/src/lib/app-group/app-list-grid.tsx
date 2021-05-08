import { makeStyles, Typography } from "@material-ui/core";
import AppMiniView from "./app-mini-view";
import { AppList } from "./models/app-models";

const useStyles = makeStyles({
  root: {
    padding: 10,
  },
  heading: {
    padding: 15,
    paddingBottom: 5,
  },
  header: {
    color: "#5c5c5c",
    fontWeight: 700,
  },
  description: {
    color: "#7d7d7d",
    fontWeight: 500,
  },
  appList: {
    display: "flex",
    flexFlow: "row wrap",
    padding: 1,
  },
});

function GridAppList(props: AppList) {
  const classes = useStyles();
  const listHeader = (appcount: number) => {
    return (
      <div className={classes.heading}>
        <Typography variant="h5" className={classes.header}>
          {props.listName} ({appcount})
        </Typography>
        <Typography variant="h6" className={classes.description}>
          {props.listDescription}
        </Typography>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      {listHeader(props.appList.length)}
      <div className={classes.appList}>
        {props.appList.map((el) => (
          <AppMiniView {...el} key={el.id} />
        ))}
      </div>
    </div>
  );
}

export default GridAppList;
