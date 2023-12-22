import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';

export default function ExportDialog(props: {
    onExport: (newPlaylist: boolean, playlistIdentifier: string) => void,
    playlists: {name: string, id: string}[],
    open: boolean,
    onClose: () => void
  }) {
  const [selectedPlaylist, setSelectedPlaylist] = React.useState(props.playlists[0]?.id || "");
  const [newPlaylist, setNewPlaylist] = React.useState(true);
  const [newPlaylistName, setNewPlaylistName] = React.useState("New Playlist");

  const handleConfirm = () => {
    props.onExport(newPlaylist, newPlaylist ? newPlaylistName : selectedPlaylist);
    props.onClose();
  };

  const hasPlaylists = props?.playlists?.length > 0;

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Add songs to playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a playlist to add your recommended songs to, or create a new one!.
          </DialogContentText>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Playlist choice</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={newPlaylist ? "new" : "existing"}
                name="radio-buttons-group"
            >
                <FormControlLabel value="new" control={<Radio />} label="New playlist" onClick={() => {setNewPlaylist(true)}}/>
                <FormControlLabel disabled={!hasPlaylists} value="existing" control={<Radio />} label="Existing playlist" onClick={() => {setNewPlaylist(false)}}/>
            </RadioGroup>
        </FormControl>
        {newPlaylist ? (
            <>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Playlist Name"
                type="email"
                fullWidth
                variant="standard"
                value={newPlaylistName}
                onChange={(event) => {setNewPlaylistName(event.target.value)}}
                />
            </>)
            : ( hasPlaylists ? (
                <>
                    <InputLabel id="demo-simple-select-label">Playlist</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedPlaylist}
                        label="Age"
                        onChange={(event) => {setSelectedPlaylist(event.target.value)}}
                    >
                        {props.playlists.map((playlist) => {
                            return <MenuItem value={playlist.id}>{playlist.name}</MenuItem>
                        })}
                    </Select>
                </>
              ) : (
                <DialogContentText>
                    You don't have any playlists yet! Create one in Spotify and try again.
                </DialogContentText>
              )
            )
        }


        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}