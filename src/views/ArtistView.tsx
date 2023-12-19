import { Rating, Skeleton, Typography } from '@mui/material';
import { Model, SpotifyArtist } from '../interfaces';
import { Suspense } from 'react';
import PersonalRatingPresenter from '../presenters/PersonalRatingPresenter';
import AverageRatingPresenter from '../presenters/AverageRatingPresenter';
import CommentPresenter from '../presenters/CommentPresenter';

interface Props {
  artist: SpotifyArtist;
  model: Model;
  
}

const ArtistView = (props: Props) => {
  const artist = props.artist;
  return (
    <div style={{marginBottom: "20px"}}>
      <img
        style={{ width: '100%', height: '300px', objectFit: 'cover', userSelect: 'none' }}
        src={artist.images[0].url}
      ></img>

      {artist.name}
      <AverageRatingPresenter uri={artist.uri} model={props.model} />
      <PersonalRatingPresenter uri={artist.uri} model={props.model}/>
    <br></br>
     <CommentPresenter model={props.model} uri={artist.uri} />

    </div>
  );
};

export default ArtistView;
