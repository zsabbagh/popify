import { observer } from 'mobx-react-lite';
import TopbarView from '../views/TopbarView';
import { Model } from '../interfaces';
import loginUrl from '../spotifyAuthorization';

interface Props {
  model: Model;
  pages: string[];
  settings: string[];
}

export default observer(function Topbar(props: Props) {
  const handleLoginLogout = () => {
    if (!!props.model.user) {
      localStorage.removeItem('spotifyAuthToken');
      props.model.user = undefined;
      props.model.userAuthToken = undefined;
    } else {
      window.location.href = loginUrl;
    }
  };
  return (
    <TopbarView
      pages={props.pages}
      settings={props.settings}
      loggedIn={!!props.model.user}
      loginUrl={loginUrl}
      handleLoginLogout={handleLoginLogout}
    />
  );
});
