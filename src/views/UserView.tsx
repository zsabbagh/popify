import { Avatar, Button, Dialog, DialogActions, DialogContent, Paper } from '@mui/material';
import { SpotifyTrack, User } from '../interfaces';
import ItemDetails from './ItemDetailsView';
import ItemListView from './ItemListView';

interface Props {
  playlists: SpotifyTrack[][];
  selectedPlaylist: SpotifyTrack[] | null;
  user: User;
  onSelectPlaylist: Function;
  openCard: boolean;
  onClose: Function;
}

export default function UserView(props: Props) {
  const user = props.user;
  const playlists = props.playlists.slice(0, 5);

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{ width: '100%', marginTop: '20px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
      >
        <Avatar
          style={{ borderRadius: '50%', width: '250px', height: '250px' }}
          src={user.images[user.images.length - 1].url}
        ></Avatar>
      </div>
      <h1>{user.display_name}</h1>

      <br></br>
      <h2>User's playlists!</h2>
      <Paper
        style={{
          margin: '20px auto',
          display: 'flex',
          flexDirection: 'row',
          padding: '20px',
          gap: '40px',
          overflowX: 'scroll',
          width: 'fit-content',
        }}
        elevation={2}
      >
        {playlists.map((playlist) => (
          <Paper
            onClick={() => {
              props.onSelectPlaylist(playlists.indexOf(playlist));
            }}
            elevation={3}
            style={{
              cursor: 'pointer',
              width: 200,
              height: 200,
              display: 'flex',
              flexWrap: 'wrap',
              boxShadow: '5px 5px 10px black',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <img
              style={{ width: 100, height: 100, margin: 0, padding: 0 }}
              src={playlist[0].album.images[playlist[0].album.images.length - 1].url}
            ></img>
            <img
              style={{ width: 100, height: 100, margin: 0, padding: 0 }}
              src={playlist[1].album.images[playlist[0].album.images.length - 1].url}
            ></img>
            <img
              style={{ width: 100, height: 100, margin: 0, padding: 0 }}
              src={playlist[2].album.images[playlist[0].album.images.length - 1].url}
            ></img>
            <img
              style={{ width: 100, height: 100, margin: 0, padding: 0 }}
              src={playlist[3].album.images[playlist[0].album.images.length - 1].url}
            ></img>
          </Paper>
        ))}
      </Paper>

      <Dialog
        open={props.openCard}
        onClose={() => props.onClose()}
        maxWidth="sm"
        fullWidth
        sx={{
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <DialogContent>
          <ItemListView items={props.selectedPlaylist} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => props.onClose()}>Export</Button>

          <Button onClick={() => props.onClose()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
