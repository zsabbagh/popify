import { Avatar, Button, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { SpotifyArtist, SpotifyTrack } from '../interfaces';

function RecommendationsView(props: {recommendations: string[];
                                    topArtists: SpotifyArtist[];
                                    topTracks: SpotifyTrack[];
                                    onGetRecommendations: () => void;
                                    onArtistSelected: (id: string, name: string) => void;
                                    onTrackSelected: (id: string, name: string) => void;
                                    seedArtists: string[];
                                    seedTracks: string[];}) {
    function trackACB(track: any) {
        return (
            <ListItem sx={{ height: 60 }}>
                <ListItemAvatar>
                    <Avatar
                        variant="square"
                        alt={`Avatar ${track.id}`}
                        src={track.album.images[0]?.url || ""}
                    />
                </ListItemAvatar>
                <ListItemText primary={track.name} secondary={track.artists[0]?.name || ""}/>
                <Checkbox id={track.id} name={track.id} onChange={() => {props.onTrackSelected(track.id, track.name)}} checked={props.seedTracks.includes(track.id)} disabled={props.seedArtists.length + props.seedTracks.length >= 5 && !props.seedTracks.includes(track.id)}/>
            </ListItem>
        );
    }

    function recommendationACB(track: any) {
        return (
            <ListItem sx={{ height: 60 }}>
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

    function artistACB(artist: any) {
        return (
            <ListItem sx={{ height: 60 }}>
                <ListItemAvatar>
                    <Avatar
                    alt={`Avatar ${artist.id}`}
                    src={artist.images[0]?.url || ""}
                    />
                </ListItemAvatar>
                <ListItemText primary={artist.name} />
                <Checkbox id={artist.id} name={artist.id} onChange={() => {props.onArtistSelected(artist.id, artist.name)}} checked={props.seedArtists.includes(artist.id)} disabled={props.seedArtists.length + props.seedTracks.length >= 5 && !props.seedArtists.includes(artist.id)}/>
            </ListItem>
        );
    }

    return (
        <>
            <Grid container spacing={2} justifyContent="space-around">
                <Grid item xs={4}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" textAlign="center">
                        Top Artists
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
                        {props.topArtists?.map(artistACB)}
                    </List>
                </Grid>

                <Grid item xs={4}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" textAlign="center">
                        Top Tracks
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {props.topTracks?.map(trackACB)}
                    </List>
                </Grid>

                <Grid item xs={4}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" textAlign="center">
                        Recommendations
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {props.recommendations?.map(recommendationACB)}
                    </List> 
                </Grid>
                <Grid item xs={0}>
                    <Button variant="contained" onClick={props.onGetRecommendations}>Get Recommendations!</Button>
                </Grid>
            </Grid>
        </>    
    );
}

export default RecommendationsView;