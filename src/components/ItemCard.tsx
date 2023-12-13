import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Album, Groups } from '@mui/icons-material';
import { Link } from "react-router-dom";

const pastelColors = [
  'rgba(255, 99, 71, 0.2)', // red
  'rgba(255, 165, 0, 0.2)', // orange
  'rgba(255, 215, 0, 0.2)', // yellow
  'rgba(255, 255, 0, 0.2)', // now greenish
  'rgba(173, 255, 47, 0.2)',
  'rgba(154, 205, 50, 0.2)',
  'rgba(0, 255, 127, 0.2)',
];

export default function ItemCard(props: { item: any; index: number; onItemSelected: Function; transition?: boolean }) {
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
      .filter((artist: any) => artist?.length > 0)
      .join(', ');
    const boxStyling = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    };
    const fontStyling = {
      fontSize: '0.8rem',
      color: blueGrey[400],
    };
    const avatarStyling = {
      color: blueGrey[200],
      marginRight: '10px',
      marginBottom: '7px',
    };
    return (
      <div style={{ marginTop: '10px' }}>
        <Box sx={boxStyling}>
          <Album sx={avatarStyling} />
          <Typography gutterBottom variant="body2" component="div" sx={fontStyling}>
            {album}
          </Typography>
        </Box>
        <Box sx={boxStyling}>
          <Groups sx={avatarStyling} />
          <Typography variant="body2" color="text.secondary" sx={fontStyling}>
            {artistNames}
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <Card
      sx={{
        float: 'left',
        position: 'relative',
        maxWidth: 345,
        background: image ? 'transparent' : 'linear-gradient(45deg, #EBF3F8 10%, #DEF2F3 90%)',
        borderRadius: '20px',
        height: '95%',
        width: '95%',
        ':hover': {
          boxShadow: '0 0 40px rgba(33,33,33,.4)',
          transition: 'all .5s ease-in-out',
        },
      }}
    >
      {image ? (
        <CardMedia
          component="img"
          height="140"
          width="140"
          image={image}
          sx={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      ) : (
        <CardMedia></CardMedia>
      )}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: '80%',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: '1.2rem',
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginTop: '2px',
              color: blueGrey[200],
              fontStyle: 'italic',
            }}
          >
            {type}
          </Typography>
          {showTrackInfo()}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            width: '50%',
          }}
        >
          nr
          <Avatar
            sx={{
              bgcolor: blueGrey[200],
              marginLeft: '10px',
            }}
          >
            {index + 1}
          </Avatar>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {type === 'artist' ? (
          <>
        
            <Link to={`/artist/${item.id}`} >
                <Button size="small">Show More</Button>
            </Link>
          </>
        ) : (
          <Button size="small">Show More</Button>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            marginLeft: 'auto',
            alignItems: 'center',
            width: '50%',
          }}
        >
          Popularity:
          <Avatar sx={{ bgcolor: 'transparent', color: 'black' }}>{popularity}</Avatar>
        </Box>
      </CardActions>
    </Card>
  );
}
