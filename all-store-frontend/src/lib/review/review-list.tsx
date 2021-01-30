import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Review } from "./models/review-models";
import ReviewCard from "./review-card";

function getDummyReviewList(): Review[] {
    let revlist: Review[] = [
        {
            id: "57655",
            date: new Date(),
            rating: 4.5,
            title: "Gets the job done",
            reviewComment: "I like it. pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. ",
            reviewerName: "stupedvivu"
        },
        {
            id: "556",
            date: new Date(),
            rating: 1.5,
            title: "Not good at all",
            reviewComment: "Misleading.  If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. ",
            reviewerName: "bhaimera"
        },
        {
            id: "557",
            date: new Date(),
            rating: 3,
            title: "Moderate, fails sometimes",
            reviewComment: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,",
            reviewerName: "oktata"
        }
    ];
    return revlist;
}

const useStyles = makeStyles({
    root: {
        textAlign: "center",
        width: "100%",
    },
    header: {
        color: "#5c5c5c",
        fontWeight: 600,
    }
});

export default function ReviewList() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h3" gutterBottom className={classes.header}>Reviews</Typography>
            <div>
                {getDummyReviewList().map((el) => (
                    <ReviewCard {...el} key={el.id} />
                ))}
            </div>
        </div>
    );
}
