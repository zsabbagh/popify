import { Avatar, Paper } from '@mui/material';
import { SpotifyTrack, User } from '../interfaces';

interface Props {
  playlists: SpotifyTrack[][];
  user: User;
}

export default function UserView(props: Props) {
  const user = props.user;
  const playlists = props.playlists;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: '100%', marginTop: '20px' }}>
        <img style={{ borderRadius: '50%', width: '250px' }} src={user.images[user.images.length - 1].url}></img>
      </div>
      <h1>{user.display_name}</h1>

      <Paper
        style={{ margin: '20px', display: 'flex', flexDirection: 'row', padding: '20px', gap: '20px' }}
        elevation={2}
      >
        {playlists.map((playlist) => (
          <Paper elevation={3} style={{ width: 200, height: 200 }}>
            <img
              style={{ width: 100, height: 100 }}
              src={playlist[0].album.images[playlist[0].album.images.length - 1].url}
            ></img>
            <img
              style={{ width: 100, height: 100 }}
              src={playlist[1].album.images[playlist[0].album.images.length - 1].url}
            ></img>
            <img
              style={{ width: 100, height: 100 }}
              src={playlist[2].album.images[playlist[0].album.images.length - 1].url}
            ></img>
            <img
              style={{ width: 100, height: 100 }}
              src={playlist[3].album.images[playlist[0].album.images.length - 1].url}
            ></img>
          </Paper>
        ))}
      </Paper>
    </div>
  );
}
