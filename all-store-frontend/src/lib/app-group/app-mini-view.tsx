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
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
import PlayForWorkRoundedIcon from "@material-ui/icons/PlayForWorkRounded";
import { humanReadableSize } from "../utils/general-utils";
import { AppMiniDetails } from "./models/app-models";

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

const buttonStyles = makeStyles({
  download: {
    borderRadius: 20,
    width: "100%",
  },
  rating: {
    backgroundColor: "#ffffcc",
    border: "2px solid #ffb700",
    color: "#595959",
    fontWeight: 600,
  },
  totDownloads: {
    backgroundColor: "#e1ffd8",
    border: "2px solid #28e800",
    color: "#595959",
    fontWeight: 600,
  },
});

function formattedDowloads(downloads: number) {
  const classes = buttonStyles();
  return (
    <span>
      <Tooltip title="Downloads" arrow placement="left">
        <Chip
          icon={<PlayForWorkRoundedIcon />}
          label={humanReadableSize(downloads, false)}
          className={classes.totDownloads}
        />
      </Tooltip>
    </span>
  );
}

function downloadButton(size: number) {
  const classes = buttonStyles();
  return (
    <div>
      <Tooltip title="Install" arrow placement="top">
        <Button
          variant="contained"
          size="medium"
          color="primary"
          startIcon={<GetAppRoundedIcon />}
          className={classes.download}
        >
          {humanReadableSize(size * 1000) + "B"}
        </Button>
      </Tooltip>
    </div>
  );
}

function formattedStars(stars: number) {
  const classes = buttonStyles();
  return (
    <span>
      <Tooltip title="Rating" arrow placement="right">
        <Chip
          icon={<StarsRoundedIcon />}
          label={stars}
          className={classes.rating}
        />
      </Tooltip>
    </span>
  );
}

function AppMiniView(props: AppMiniDetails) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.icon}
        title={props.name}
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" gutterBottom className={classes.appname}>
          {props.name}
        </Typography>
        <div>
          <Typography variant="h6" gutterBottom>
            {formattedStars(props.stars)}&nbsp;
            {formattedDowloads(props.downloads)}
          </Typography>
          {downloadButton(props.size)}
        </div>
      </CardContent>
    </Card>
  );
}

export default AppMiniView;
