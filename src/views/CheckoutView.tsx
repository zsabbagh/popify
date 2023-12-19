import { Avatar, Button, Checkbox, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import { ItemData, SpotifyAlbum, SpotifyArtist, SpotifyItem, SpotifyTrack } from '../interfaces';
import ExportDialog from '../components/ExportDialog';
import { teal } from '@mui/material/colors';
import { RemoveCircleOutline } from '@mui/icons-material';

function CheckoutView(props: {
                                    recommendations: SpotifyTrack[];
                                    cartItems: ItemData[];
                                    onGetRecommendations: () => void;
                                    userPlaylists: {name: string, id: string}[];
                                    onExport: (newPlaylist: boolean, playlistIdentifier: string) => void;
                                    onRemoveItem: (index: number) => void;
                            }) {

    function itemACB(item: ItemData, index: number) {
        const id = item.id;
        const name = item.name;
        const image = item.image || "";

        return (
            <ListItem sx={{ height: 60, width: "25%"}}>
                <ListItemAvatar>
                    <Avatar
                        variant="square"
                        alt={`Avatar ${id}`}
                        src={image}
                    />
                </ListItemAvatar>
                <ListItemText primary={name} secondary={item.type}/>
                <Tooltip title="Remove from Cart" placement="bottom">
                <IconButton onClick={() => props.onRemoveItem(index)}
                    sx={{
                    color: teal[200],
                    marginLeft: 'auto',
                    }}
                >
                    <RemoveCircleOutline />
                </IconButton>
                </Tooltip>
            </ListItem>
        );
    }

    function recommendationACB(track: SpotifyTrack) {
        return (
            <ListItem sx={{ height: 60, width: "25%"}}>
                <ListItemAvatar>
                    <Avatar
                        variant="square"
                        alt={`Avatar ${track.id}`}
                        src={track.album.images[0]?.url || ""}
                    />
                </ListItemAvatar>
                <ListItemText primary={track.name} secondary={track.artists[0]?.name || ""}/>
            </ListItem>
        );
    }

    return (
        <>
            <Grid container spacing={2} justifyContent="space-around">
                <Grid item xs={6}>
                    <Typography sx={{ mt: 2, mb: 0 }} variant="h6" component="div" textAlign="center">
                        Cart
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {props.cartItems?.map(itemACB)}
                        <ListItem sx={{ height: 60, width: "25%", mt:3}}>
                            <Button sx={{width:"100%"}} variant="contained" onClick={props.onGetRecommendations}>Get Recommendations!</Button>
                        </ListItem>
                    </List>
                    
                </Grid>

                <Grid item xs={6}>
                    <Typography sx={{ mt: 2, mb: 0 }} variant="h6" component="div" textAlign="center">
                        Recommendations
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {props.recommendations?.map(recommendationACB)}
                        <ListItem sx={{ height: 60, width: "25%", mt:3}}>
                            <ExportDialog playlists={props.userPlaylists} onExport={props.onExport}/>
                        </ListItem>
                    </List> 
                </Grid>
            </Grid>
        </>    
    );
}

export default CheckoutView;