import { Rating, Skeleton, Typography } from '@mui/material';
import { Model, SpotifyArtist } from '../interfaces';
import { Suspense } from 'react';
import PersonalRatingPresenter from '../presenters/PersonalRatingPresenter';
import AverageRatingPresenter from '../presenters/AverageRatingPresenter';

interface Props {
  artist: SpotifyArtist;
  model: Model;
  
}

const ArtistView = (props: Props) => {
  const artist = props.artist;
  return (
    <>
      <img
        style={{ width: '100%', height: '300px', objectFit: 'cover', userSelect: 'none' }}
        src={artist.images[0].url}
      ></img>

      {artist.name}
      <AverageRatingPresenter uri={artist.uri} model={props.model} />
      <PersonalRatingPresenter uri={artist.uri} model={props.model}/>


    </>
  );
};

export default ArtistView;
