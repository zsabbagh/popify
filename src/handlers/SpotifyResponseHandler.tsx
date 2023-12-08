import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { fetchUser } from '../utils/spotifyFetcher';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Model } from '../interfaces';

interface Props {
  model: Model;
}

export default observer(function SpotifyResponseHandler(props: Props) {
  const navigate = useNavigate();
  const location = useLocation(); // token is in the url as popify.com/login#access_token=...
  const accessToken: string = new URLSearchParams(location.hash).get('#access_token') || '';
  const path = localStorage.getItem('lastKnownPathBeforeLogin');
  localStorage.removeItem('lastKnownPathBeforeLogin');

  localStorage.setItem('spotifyAuthToken', accessToken);
  props.model.loginUser(accessToken);
  navigate(path || '/');

  return <>Handling authentication...</>;
});
