import { ItemData } from "../interfaces";
import { blueGrey } from "@mui/material/colors";
import { Album, AutoStories, Groups } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ItemDetails(props: {
  item: ItemData | undefined,
  spacing?: any | undefined,
  style?: any | undefined,
  titleStyle?: any | undefined,
  infoStyle?: any | undefined,
}) {
  if (!props.item) {
    return <></>;
  }

  function artistCB(artist: ItemData) {
    return (
      <Tooltip title={`${artist.name}'s artist page`} placement="top" arrow>
        <Box sx={{
          marginRight: '10px',
          marginBottom: '7px',
          backgroundColor: blueGrey[50],
          borderRadius: '5px',
          padding: '2px 5px',
          height: 'fit-content',
          width: 'fit-content',
          ':hover': {
            backgroundColor: blueGrey[100],
            borderColor: blueGrey[400],
            cursor: 'pointer',
          }
        }}>
          <Link to={"/artist/" + artist.id} style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="text.secondary" sx={fontStyling}>
              {artist.name}
            </Typography>
          </Link>
        </Box>
      </Tooltip>
    );
  }

  const {left, right, top, bottom} = props.spacing ? props.spacing : {left: 0, right: 0, top: 0, bottom: 0};
  const item = props.item;
  const styling = props.style ? props.style : {};
  const titleStyle = props.titleStyle ? props.titleStyle : { fontSize: '1.2rem' };
  const infoStyle = props.infoStyle ? props.infoStyle : {};
  const { type, image, name, album, popularity } = item;
  const artists = item.artists ? item.artists.join(', ') : '';

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

  const genres = item.genres ? item.genres.join(', ') : '';
  function generateTrackInformation() {
    return (
      <div>
        {type === 'track' || type === 'genre' ? <Box sx={boxStyling}>
          <Groups sx={avatarStyling} />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {item.artists?.map(artistCB)}
          </div>
        </Box> : <></>}
        {type === 'track' ?         <Box sx={boxStyling}>
          <Album sx={avatarStyling} />
          <Typography gutterBottom variant="body2" component="div" sx={fontStyling}>
            {album}
          </Typography>
        </Box> : <></>}
      </div>
    );
  }
  return (
    <div style={{
      marginTop: top, 
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
      ...styling
      }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ ...titleStyle }}
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
          marginBottom: '10px',
        }}
      >
        {type}
      </Typography>
      {generateTrackInformation()}
      {item?.genres && genres ?
        <Box sx={boxStyling}>
          <AutoStories sx={avatarStyling} />
          <Typography variant="body2" color="text.secondary" sx={fontStyling}>
            {genres}
          </Typography>
        </Box>
        : <></>  
      }
    </div>
  );
}