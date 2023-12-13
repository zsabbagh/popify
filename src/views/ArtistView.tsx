import { Skeleton } from '@mui/material';
import { SpotifyArtist } from '../interfaces';

interface Props {
  artist: SpotifyArtist;
}

const ArtistView = (props: Props) => {
  const artist = props.artist;
  return (
    <>
      <img style={{ width: '100%', height: '300px', objectFit: 'cover', userSelect:"none" }} src={artist.images[0].url}></img>
      
      {artist.name}
    </>
  );
};

export default ArtistView;
