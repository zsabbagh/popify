import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPresenter from './LoginPresenter';
import loginUrl from '../spotifyAuthorization';
import SpotifyResponseHandler from '../utils/SpotifyResponseHandler';
import { observer } from 'mobx-react-lite';
import Topbar from './TopbarPresenter';
import Statistics from './StatisticsPresenter';
import { Model } from '../interfaces';

interface Props {
  model: Model;
}

const pages = ['Statistics', 'Quiz'];
const settings = ['Logout'];

export default observer(function Router(props: Props) {
  props.model.loginUser();
  console.log('user', props.model.userState);
  return (
    <>
      <BrowserRouter>
        <Topbar pages={pages} settings={settings} model={props.model} />
        <Routes>
          <Route index element={<a href={loginUrl}>login</a>} />
          <Route path="/statistics" element={<Statistics model={props.model.userState} />} />
          <Route path="/quiz" element={<>Quizzes here</>} />
          <Route path="/spotifyResponse" element={<SpotifyResponseHandler model={props.model} />} />
          <Route path="*" element={<>404, page not found!</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
});
