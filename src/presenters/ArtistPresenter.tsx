import { Suspense, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Model, SpotifyArtist } from '../interfaces';
import { useParams } from 'react-router-dom';
import { CircularProgress, Skeleton } from '@mui/material';
import ArtistView from '../views/ArtistView';
import Loader from '../components/Loader';

interface Props {
  model: Model;
}

export default observer(function ArtistPresenter(props: Props) {
  let { id } = useParams();
  const artist = props.model.artists.find((artist) => artist.id === id);

  useEffect(() => {
    if (artist) {
      //Load additional data
    } else {
      props.model.addArtist(id!);
    }
  }, []);

  if (!artist || !props.model.userState.user) {
    return <Loader></Loader>;
  }

  return (
    <>
      <ArtistView artist={artist!} model={props.model} />
    </>
  );
});
