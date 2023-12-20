import { Rating, Skeleton, Typography } from '@mui/material';
import { Comment, ItemData, Model, SpotifyArtist } from '../interfaces';
import { Suspense } from 'react';
import CommentView from './CommentView';
import LoaderView from './LoaderView';
import RatingView from './RatingView';

interface Props {
  item: ItemData; // TODO: fix this to use the correct type
  model: Model;
  averageRating: { count: number; average: number };
  userRating: number | null;
  onRatingChange: (value: number | null) => void;
  comments: Comment[] | null;
  onAddComment: (title: string, content: string) => void;
}

export default function ItemPageView(props: Props) {
  const item = props.item;

  if (!item) {
    return <LoaderView />;
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <img style={{ width: '100%', height: '300px', objectFit: 'cover', userSelect: 'none' }} src={item.image}></img>

      <div style={{ textAlign: 'center' }}>
        <h1>{item.name}</h1>
      </div>
      <RatingView
        averageRating={props.averageRating}
        userRating={props.userRating}
        onRatingChange={props.onRatingChange}
      />
      <br></br>
      <CommentView comments={props.comments} onAddComment={props.onAddComment} />
    </div>
  );
}
