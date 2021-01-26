import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { Typography } from "@material-ui/core";
import { reviewLabels } from "./models/review-models";

const useStyles = makeStyles({
  root: {
    width: 200,
    textAlign: "center",
    height: 80,
    padding: 10,
  },
});

export default function HoverRating() {
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  function getCurrentValue() {
    let val = hover !== -1 ? hover : value;
    return val ? val : 0;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3">{getCurrentValue()}</Typography>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        size="large"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <br />
      <Typography variant="h6">{reviewLabels[getCurrentValue()]}</Typography>
    </div>
  );
}
