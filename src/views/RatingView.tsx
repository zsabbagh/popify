import { Rating } from "@mui/material";
import LoaderView from "./LoaderView";
import { useEffect } from "react";

export default function RatingView(props: {
    averageRating: { count: number; average: number };
    userRating: number | null;
    onRatingChange: (value: number | null) => void;
}) {
    if (!props.averageRating) {
      return <LoaderView />;
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Rating value={props.averageRating.average} readOnly precision={0.1} />
        <span>{`${props.averageRating.count} reviews!`}</span>
        <Rating
          value={props.userRating}
          onChange={(event, value) => props.onRatingChange(value)}
        />
      </div>
    );
}