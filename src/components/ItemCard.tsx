import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Album, Groups } from "@mui/icons-material";


export default
function ItemCard(props: { item: any; index: number; onItemSelected: Function }) {
    const type = props?.item?.type || undefined;
    const index = props.index;
    const item = props.item;
    const images = item?.images ? item.images : item?.album?.images || [];
    const image = images[0]?.url || '';
    const name = item?.name;
    const artist = item.type === 'track' ? item.artists[0]?.name : item.name;
    const popularity = item?.popularity;

    function showTrackInfo() {
        if (type !== 'track') {
            return <></>;
        }
        const album = item?.album?.name;
        const artists = item?.artists;
        const artistNames = artists
            .map((artist: any) => artist?.name || '')
            .filter((artist: any) => (artist?.length > 0))
            .join(', ');
        return (
            <div>
                <div>
                    <Album/>
                    <Typography gutterBottom variant="body2" component="div">
                        {album}
                    </Typography>
                </div>
                <div>
                    <Groups/>
                    <Typography variant="body2" color="text.secondary">
                        {artistNames}
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <Card sx={{
            maxWidth: 345, 
            borderRadius: '20px', 
            height: '95%',
            width: '95%',
            ':hover': {
                boxShadow: '0 0 20px rgba(33,33,33,.4)',
                transition: 'all .5s ease-in-out',
            }, }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
            />
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Box sx={{
                    width: '80%',
                }}>
                    <Typography gutterBottom variant="h5" component="div">
                    {name}
                    </Typography>
                    {showTrackInfo()}
                    <Typography variant="body2" color="text.secondary">
                    {type}
                    </Typography>
                </Box>
                <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    width: '50%' }}>
                    nr
                    <Avatar sx={{ 
                        bgcolor: blueGrey[200],
                        marginLeft: '10px',
                    }}>
                        {index + 1}
                    </Avatar>
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <Button size="small">Show More</Button>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    marginLeft: 'auto',
                    alignItems: 'center',
                    width: '50%',
                }}
                >
                    Popularity:
                    <Avatar sx={{bgcolor: 'transparent', color: 'black'}}>{popularity}</Avatar>
                </Box>
            </CardActions>
        </Card>
    );
}