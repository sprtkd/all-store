import { makeStyles } from "@material-ui/core";
import AppMiniView from "./app-mini-view";
const useStyles = makeStyles({
  root: {
    padding: 15,
  },
});

function HorizontalAppList() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppMiniView
        id="41545"
        name="7zip - Easy unzip/compress files"
        icon="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/7-Zip_Icon.svg/1280px-7-Zip_Icon.svg.png"
        size={125555}
        stars={4.2}
        downloads={902563}
      />
    </div>
  );
}

export default HorizontalAppList;
