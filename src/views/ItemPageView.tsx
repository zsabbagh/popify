import { Rating, Skeleton, Typography } from '@mui/material';
import { Comment, ItemData, Model, SpotifyArtist } from '../interfaces';
import { Suspense } from 'react';
import CommentView from './CommentView';

interface Props {
  item: ItemData; // TODO: fix this to use the correct type
  model: Model;
  averageRating: { count: number; average: number };
  userRating: number | null;
  onRatingChange: (value: number | null) => void;
  comments: Comment[] | null;
  onAddComment: (title: string, content: string) => void;
}

export default
function ItemPageView(props: Props) {
  const item = props.item;

  function renderRating() {
    if (!props.averageRating) {
      return <Skeleton></Skeleton>;
    }
    return (
      <div>
        <Rating value={props.averageRating.average} readOnly precision={0.1} />
        <span>{`${props.averageRating.count} reviews!`}</span>
      </div>
    );
  }

  return (
    <div style={{marginBottom: "20px"}}>
      <img
        style={{ width: '100%', height: '300px', objectFit: 'cover', userSelect: 'none' }}
        src={item.image}
      ></img>

      {item.name}
      {renderRating()}
        <Rating
          value={props.userRating}
          onChange={(event, value) => props.onRatingChange(value)}
        />
    <br></br>
     <CommentView comments={props.comments} onAddComment={props.onAddComment} />
    </div>
  );
}
