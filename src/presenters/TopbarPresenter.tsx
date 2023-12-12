import { observer } from 'mobx-react-lite';
import TopbarView from '../views/TopbarView';
import { Model } from '../interfaces';
import loginUrl from '../utils/spotifyAuthorization';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  model: Model;
  pages: string[];
  settings: string[];
}

export default observer(function Topbar(props: Props) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/search?q=' + searchTerm);
  }
  const handleLoginLogout = () => {
    if (!!props.model.userState.user) {
        props.model.logoutUser();
    } else {
      console.log("path", window.location.pathname);
      
      localStorage.setItem('lastKnownPathBeforeLogin', window.location.pathname);
      window.location.href = loginUrl;
    }
  };
  return (
    <TopbarView
      pages={props.pages}
      settings={props.settings}
      loggedIn={!!props.model.userState.user}
      loginUrl={loginUrl}
      handleLoginLogout={handleLoginLogout}
      onSearchChange={(term: string) => setSearchTerm(term)}
      onSearch={handleSearch}
    />
  );
});
