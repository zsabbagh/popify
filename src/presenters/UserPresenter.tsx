import { redirect, useParams } from 'react-router-dom';
import { Model, SpotifyTrack, User } from '../interfaces';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import LoaderView from '../views/LoaderView';
import UserView from '../views/UserView';

export default observer(function UserPresenter(props: { model: Model }) {
  const { id } = useParams();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userPlaylists, setUserPlaylists] = useState<SpotifyTrack[][]>([]);


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

  if(!user){
    return <LoaderView />
  }

  return <UserView user={user} playlists={userPlaylists}></UserView>;
});
