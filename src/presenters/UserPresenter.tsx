import { redirect, useParams } from 'react-router-dom';
import { Model, SpotifyTrack, User } from '../interfaces';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import LoaderView from '../views/LoaderView';
import UserView from '../views/UserView';
import { createPlaylist, addTracksToPlaylist, fetchCurrentUserPlaylists } from '../utils/spotifyFetcher';
import ItemDialog from '../views/ItemDialogView';
import { Alert, Fade } from '@mui/material';
import { CheckCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

export default observer(function UserPresenter(props: { model: Model }) {
  const { id } = useParams();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userPlaylists, setUserPlaylists] = useState<SpotifyTrack[][]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyTrack[] | null>(null);
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [SpotifyUserPlaylists, setSpotifyUserPlaylists] = useState<{ name: string; id: string }[]>([]);
  const [failedExport, setFailedExport] = useState(false);
  const [successfulExport, setSuccessfulExport] = useState(false);
  const [attemptingExport, setAttemptingExport] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const result = await props.model.getUser(id);
      setUser(result);
    };

    const getUserPlaylists = async () => {
      const result = await props.model.getPlaylists(id || '');
      setUserPlaylists(result);
    };


    function getSpotifyUserPlaylists() {
      fetchCurrentUserPlaylists(accessToken).then((playlists) => {
        setSpotifyUserPlaylists(playlists);
      });
    }
    getSpotifyUserPlaylists();
    getUserPlaylists();
    getUser();
  }, [id]);

  const accessToken = props.model.userState.userAuthToken!;

  const onSelectPlaylist = (playlistIndex: number) => {
    setSelectedPlaylist(userPlaylists[playlistIndex]);
    setOpenCard(true);
  };
  const onClose = () => {
    setOpenCard(false);

  };

  const onExportACB = (newPlaylist: boolean, playlistIdentifier: string) => {
    if (!selectedPlaylist) return;
    setAttemptingExport(true);
    if (newPlaylist) {
      // create new playlist
      let id = props.model.userState?.user?.id;
      if (!id) {
        setAttemptingExport(false);
        return;
      }
      createPlaylist(accessToken, id, playlistIdentifier).then((playlistId) => {
        addTracksToPlaylist(
          accessToken,
          playlistId,
          selectedPlaylist.map((item) => item.uri)
        );
        setTimeout(() => {
          setAttemptingExport(false);
        }, 500);
        setSuccessfulExport(true);
        setTimeout(() => {
          setSuccessfulExport(false);
        }, 3000);
      }).catch((err) => {
        setAttemptingExport(false);
        setFailedExport(true);
        setTimeout(() => {
          setFailedExport(false);
        }, 3000);
      });
    } else {
      // add to existing playlist
      addTracksToPlaylist(
        accessToken,
        playlistIdentifier,
        selectedPlaylist.map((item) => item.uri)
      );
    }
  };

  if (!user) {
    return <LoaderView />;
  }

  return (
    <>
      <UserView
        onClose={onClose}
        openCard={openCard}
        selectedPlaylist={selectedPlaylist}
        onSelectPlaylist={onSelectPlaylist}
        user={user}
        playlists={userPlaylists}
        onExport={onExportACB}
        spotifyPlaylists={SpotifyUserPlaylists}
        successfulExport={successfulExport}
        failedExport={failedExport}
        attemptingExport={attemptingExport}
      ></UserView>
            
    </>
  );
});
