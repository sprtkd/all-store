import {
  Card,
  ButtonBase,
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

export interface AppMiniDetails {
  id: string;
  name: string;
  icon: string;
  stars: number;
  downloads: number;
  size: number;
}

const useStyles = makeStyles({
  root: {
    width: 200,
    borderRadius: 15,
    boxShadow: "1px 1px 5px 0px rgb(187 187 187)",
    "&:hover": { boxShadow: "2px 2px 8px 1px rgb(187 187 187)" },
  },
  content: {
    paddingTop: 8,
  },
  media: {
    margin: "auto",
    marginTop: 15,
    height: 100,
    width: 100,
  },
  appname: {
    fontWeight: 700,
    color: "#8c8c8c",
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
  },
  totDownloads: {
    backgroundColor: "#e1ffd8",
    border: "2px solid #28e800",
  },
});

function formattedDowloads(downloads: number) {
  const classes = buttonStyles();
  return (
    <span>
      <Tooltip title="Downloads" arrow placement="left">
        <Chip
          icon={<PlayForWorkRoundedIcon />}
          label={humanReadableSize(downloads)}
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
    <ButtonBase>
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
          <Typography variant="h6" gutterBottom>
            {formattedStars(props.stars)}&nbsp;
            {formattedDowloads(props.downloads)}
          </Typography>
          {downloadButton(props.size)}
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

export default AppMiniView;
