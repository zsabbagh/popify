import { redirect, useParams } from 'react-router-dom';
import { Model, SpotifyTrack, User } from '../interfaces';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import LoaderView from '../views/LoaderView';
import UserView from '../views/UserView';
import {
  createPlaylist,
  addTracksToPlaylist,
} from '../utils/spotifyFetcher';

export default observer(function UserPresenter(props: { model: Model }) {
  const { id } = useParams();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userPlaylists, setUserPlaylists] = useState<SpotifyTrack[][]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyTrack[]>([]);


  useEffect(() => {
    const getUser = async() => {
      const result = await props.model.getUser(id);
      setUser(result);
    }

    const getUserPlaylists = async() => {
      const result = await props.model.getPlaylists(id || "");
      setUserPlaylists(result);
    }

    getUserPlaylists();
    getUser()
  },[])

  const accessToken = props.model.userState.userAuthToken!;

  const onSelectPlaylist = (playlist: SpotifyTrack[]) => {
    setSelectedPlaylist(playlist);
  }

  const onExportACB = (newPlaylist: boolean, playlistIdentifier: string) => {
    if (!selectedPlaylist) return;
    if (newPlaylist) {
      // create new playlist
      if (!id) {
        return;
      }
      createPlaylist(accessToken, id, playlistIdentifier).then((playlistId) => {
        addTracksToPlaylist(
          accessToken,
          playlistId,
          selectedPlaylist.map((item) => item.uri)
        );
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




  if(!user){
    return <LoaderView />
  }

  return <UserView user={user} playlists={userPlaylists}></UserView>;
});
