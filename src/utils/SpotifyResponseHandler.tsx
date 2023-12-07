import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { fetchUser } from '../spotifyFetcher';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Props {
  model: any;
}

export default observer(function SpotifyResponseHandler(props: Props) {
  const navigate = useNavigate();
  const location = useLocation(); // token is in the url as popify.com/login#access_token=...
  const accessToken: string = new URLSearchParams(location.hash).get('#access_token') || '';

  localStorage.setItem('spotifyAuthToken', accessToken);

  props.model.accessToken = accessToken;
  useEffect(() => {
    fetchUser(accessToken).then((user) => {
      props.model.user = user;
      navigate('/');
    });
  }, []);

  return <>Handling authentication...</>;
});
