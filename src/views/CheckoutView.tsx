import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { ItemData, SpotifyAlbum, SpotifyArtist, SpotifyItem, SpotifyTrack } from '../interfaces';
import ExportDialogView from './ExportDialogView';
import { blueGrey, teal } from '@mui/material/colors';
import { CheckCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import LoaderView from './LoaderView';
import { Link, useNavigate } from 'react-router-dom';
import ItemListView from './ItemListView';
import { getItemInformation } from '../utils/tools';
import { useState } from 'react';

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

function CheckoutView(props: {
  recommendations: SpotifyTrack[] | null;
  cartItems: ItemData[];
  onGetRecommendations: () => void;
  userPlaylists: { name: string; id: string }[];
  onExport: (newPlaylist: boolean, playlistIdentifier: string) => void;
  onRemoveItem: (index: number) => void;
  onRemoveRecommendation: (index: number) => void;
  successfulExport?: boolean;
  successfulGen?: boolean;
  failedExport?: boolean;
  failedGen?: boolean;
  attemptingExport?: boolean;
  attemptingGen?: boolean;
}) {
  const navigate = useNavigate();

  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  return (
    <>
      <ExportDialogView
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        onExport={props.onExport}
        playlists={props.userPlaylists}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '50%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ItemListView title="Generate list from" items={props.cartItems} onRemoveItem={props.onRemoveItem} nameOfList="cart" />
          {props.cartItems?.length > 0 ? (
            <Tooltip
              title="Generate recommendations from your chosen items"
              placement="bottom"
            >
              <Button
                disabled={props.attemptingGen}
                variant="outlined"
                sx={{ width: 'fit-content', padding: 'auto' }}
                onClick={props.onGetRecommendations}
              >
                Generate new songs
              </Button>
            </Tooltip>
          ) : (
            <>
              <Typography
                sx={{ mt: 2, mb: 0, color: blueGrey[500] }}
                variant="body1"
                component="div"
                textAlign="center"
              >
                Add items to your cart to generate a playlist.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '20px',
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ margin: '10px', width: '200px', padding: 'auto' }}
                  onClick={() => navigate('/top')}
                >
                  Show my top items
                </Button>
                <Button
                  variant="outlined"
                  sx={{ margin: '10px', width: '200px', padding: 'auto' }}
                  onClick={() => navigate('/search')}
                >
                  Search music
                </Button>
              </Box>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: '50%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ItemListView
            title="Recommendations"
            items={props.recommendations}
            onRemoveItem={props.onRemoveRecommendation}
            emptyText="No items in recommendations."
            attemptingUpdate={props.attemptingGen}
          />
          {props.recommendations !== null && props.recommendations.length > 0 ? (
            <Tooltip title="Exports the generated playlist to Spotify." placement="bottom">
              <Button
                variant="outlined"
                sx={{ width: 'fit-content', padding: 'auto' }}
                onClick={() => setExportDialogOpen(true)}
              >
                Add playlist to Spotify
              </Button>
            </Tooltip>
          ) : (
            <></>
          )}
        </Box>
        {
          <Fade in={props?.successfulGen} unmountOnExit={true}>
            <Alert severity="success" sx={alertStyling} icon={<CheckCircleOutline />}>
              Playlist generated!
            </Alert>
          </Fade>
        }
        {
          <Fade in={props?.failedGen} unmountOnExit={true}>
            <Alert severity="error" sx={alertStyling} icon={<RemoveCircleOutline />}>
              Playlist generation failed.
            </Alert>
          </Fade>
        }
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
      </div>
    </>
  );
}

export default CheckoutView;
