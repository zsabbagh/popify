import { Alert, Avatar, Button, Dialog, DialogActions, DialogContent, Fade, Paper } from '@mui/material';
import { SpotifyTrack, User } from '../interfaces';
import ItemDetails from './ItemDetailsView';
import ItemListView from './ItemListView';
import ExportDialogView from './ExportDialogView';
import { useState } from 'react';
import { CheckCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

interface Props {
  playlists: SpotifyTrack[][];
  selectedPlaylist: SpotifyTrack[] | null;
  spotifyPlaylists: { name: string; id: string }[];
  user: User;
  onSelectPlaylist: Function;
  openCard: boolean;
  onClose: Function;
  onExport: (newPlaylist: boolean, playlistIdentifier: string) => void;
  successfulExport: boolean;
  failedExport: boolean;
  attemptingExport: boolean;
}

export default function UserView(props: Props) {
  const user = props.user;
  const playlists = props.playlists.slice(0, 5);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const alertStyling = {
    position: 'fixed',
    fontSize: 'auto',
    bottom: '10%',
    left: '50%',
    marginLeft: '-200px',
    borderRadius: '40px',
    right: '50%',
    marginRight: '-200px',
    width: '400px',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{ width: '100%', marginTop: '20px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
      >
        <Avatar
          style={{ borderRadius: '50%', width: '250px', height: '250px' }}
          src={user.images[user.images.length - 1]?.url || ""}
        ></Avatar>
      </div>
      <h1>{user.display_name}</h1>

      <br></br>
      <h2>Your playlists</h2>
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
        {playlists.length === 0 ? <h2>No playlists yet</h2> : <></>}
        {playlists.map((playlist, index) => (
          <Paper
            key={index}
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
          <Button
            onClick={() => {
              props.onClose();
              setTimeout(() => {
                setExportDialogOpen(true);
              }, 200);
            }}
          >
            Export
          </Button>
          <Button onClick={() => props.onClose()}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <ExportDialogView
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        onExport={props.onExport}
        playlists={props.spotifyPlaylists}
      />

      {
        <Fade in={props?.successfulExport} unmountOnExit={true}>
          <Alert severity="success" sx={alertStyling} icon={<CheckCircleOutline />}>
            Playlist exported!
          </Alert>
        </Fade>
      }
      {
        <Fade in={props?.failedExport} unmountOnExit={true}>
          <Alert severity="error" sx={alertStyling} icon={<RemoveCircleOutline />}>
            Playlist export failed.
          </Alert>
        </Fade>
      }

      {
        <Fade in={props?.attemptingExport} unmountOnExit={true}>
          <Alert severity="info" sx={alertStyling} icon={<RemoveCircleOutline />}>
            Export request sent
          </Alert>
        </Fade>
      }
    </div>
  );
}
