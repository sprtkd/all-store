import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { Typography } from "@material-ui/core";
import { RatingModel, reviewLabels } from "./models/review-models";
import { roundWithHalfPrecision } from "../utils/general-utils";

const useStyles = makeStyles({
  root: {
    width: 200,
    textAlign: "center",
    height: 150,
    padding: 10,
  },
});

export default function HoverRating(props: RatingModel) {
  const [value, setValue] = React.useState<number | null>(props.value);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  function getCurrentValue() {
    let val = hover !== -1 ? hover : value;
    return val ? val : 0;
  }

  function getRoundedCurrentValue() {
    return roundWithHalfPrecision(getCurrentValue());
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3">{getCurrentValue()}</Typography>
      <Rating
        name={"hover-feedback" + props.ratingid}
        value={value}
        precision={0.5}
        size="large"
        disabled={!props.isEditable}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <br />
      <Typography variant="h6">{reviewLabels[getRoundedCurrentValue()]}</Typography>
    </div>
  );
}
