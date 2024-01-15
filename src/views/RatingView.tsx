import { Paper, Rating } from '@mui/material';
import LoaderView from './LoaderView';
import { useEffect } from 'react';

export default function RatingView(props: {
  averageRating: { count: number; average: number };
  userRating: number | null;
  onRatingChange: (value: number | null) => void;
}) {
  if (!props.averageRating) {
    return <LoaderView />;
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper style={{ padding: '10px 20px', alignItems: 'center', justifyContent: 'center' }} elevation={2}>
        <div style={{ display: 'flex' }}>
          <Rating value={props.averageRating.average} readOnly precision={0.1} />
          <div style={{ lineHeight: '24px', marginLeft: '4px' }}>{` with ${props.averageRating.count} reviews!`}</div>
        </div>
      </Paper>

      <Paper
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        elevation={2}
      >
        <h3>{`Create a rating`}</h3>
        <Rating value={props.userRating} onChange={(event, value) => props.onRatingChange(value)} />

      </Paper>
    </div>
  );
}
