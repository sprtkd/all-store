import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import HoverRating from "./rating-big";
import { Review } from "./models/review-models";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
        width: "80%",
        margin: "auto",
        marginTop: 20,
        minHeight: 200,
        padding: 10,
        display: "flex",
        flexWrap: "wrap",
        borderRadius: 20,
        justifyContent: "center",
        background: "#f0f0f0",
        boxShadow: "6px 6px 10px #d1d1d1, -6px -6px 10px #ffffff",
        "&:hover": {
            background: "#ffffff",
            boxShadow: "4px 4px 5px #d1d1d1, -4px -4px 5px #ffffff",
        }
    },
    commentDiv: {
        maxWidth: "80%",
        textAlign: "left",
        padding: 10
    },
    subheader: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: 10
    },
    subheaderItems: {
        fontSize: 15,
        marginRight: 5
    },
    header: {
        color: "#5c5c5c",
        fontWeight: 500,
    },
    commentText: {
        marginTop: 10,
        color: "#5c5c5c",
        fontWeight: 500,
    }
});

export default function ReviewCard(props: Review) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <HoverRating value={props.rating} isEditable={false} ratingid={props.id} />
            <div className={classes.commentDiv}>
                <Typography variant="h5" gutterBottom className={classes.header}>{props.title}</Typography>

                <div className={classes.subheader}>
                    <Typography variant="h6" className={classes.subheaderItems}>By </Typography>
                    <Chip avatar={<Avatar>{props.reviewerName.charAt(0).toUpperCase()}</Avatar>}
                        label={props.reviewerName} clickable color="primary" variant="outlined" size="small" />
                        &nbsp;
                    <Typography variant="h6" className={classes.subheaderItems}>on </Typography>
                    <Typography variant="h6" className={classes.subheaderItems}>{props.date.toDateString()}</Typography>
                </div>
                <Divider light />
                <Typography variant="h6" className={classes.commentText}>{props.reviewComment}</Typography>
            </div>
        </div>
    );
}
