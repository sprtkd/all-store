export interface Review {
    id: string;
    reviewerName: string;
    date: Date;
    title: string;
    reviewComment: string;
    rating: number;
}

export const reviewLabels: { [index: string]: string } = {
    0.5: "Useless",
    1: "Bad",
    1.5: "Very Poor",
    2: "Poor",
    2.5: "Okaish",
    3: "Ok",
    3.5: "Good",
    4: "Really Good",
    4.5: "Excellent",
    5: "Fabulous",
};