import { ItemData } from "../interfaces";
import { blueGrey } from "@mui/material/colors";
import { Album, AutoStories, Groups } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { isValidType } from "../utils/spotifyFetcher";

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

  function renderItem(item: ItemData | string | undefined) {

    if (!item) {
      return <></>;
    }

    if (typeof item === 'string') {
      return (
        <Typography variant="body2" color="text.secondary" sx={fontStyling}>
          {item}
        </Typography>
      );
    }

    return (
      <Tooltip title={`${item.name}'s ${item.type} page`} placement="top" arrow>
        <Box sx={{
          marginRight: '10px',
          marginBottom: '7px',
          backgroundColor: '#DEE6EA',
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
          <Link to={`/${item.type}/${item.id}`} style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="text.secondary" sx={fontStyling}>
              {item.name}
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
        {item?.artists?.length ?
        <Box sx={boxStyling}>
          <Groups sx={avatarStyling} />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {item.artists.map(renderItem)}
          </div>
        </Box> : <></>}
        {type === 'track' ?         <Box sx={boxStyling}>
          <Album sx={avatarStyling} />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {renderItem(item.album)}
          </div>
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