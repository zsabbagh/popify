import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPresenter from './presenters/loginPresenter';
import loginUrl from './spotifyAuthorization';
import SpotifyResponseHandler from './utils/SpotifyResponseHandler';
import { observer } from 'mobx-react-lite';
import { Model } from './interfaces';
import Topbar from './presenters/topbarPresenter';


interface Props {
  model: Model;
}

const pages = ["Statistics", "Quiz"];
const settings = ["Logout"];

export default observer(function Router(props: Props) {
  console.log('user', props.model.user);
  return (
    <>
      {props.model.user ? (
        <>
          <div>{`Current username: ${props.model.user.external_urls.spotify}`}</div>
          <img src={props.model.user.images[0].url}></img>
        </>
      ) : (
        <></>
      )}
      <BrowserRouter>
      <Topbar pages={pages} settings={settings} model={props.model} loginUrl={loginUrl} />
        <Routes>
          <Route index element={<a href={loginUrl}>login</a>} />
          <Route path="/statistics" element={<>Statistics here</>} />
          <Route path="/quiz" element={<>Quizzes here</>} />
          <Route path="/spotifyResponse" element={<SpotifyResponseHandler model={props.model} />} />
          <Route path="*" element={<>404, page not found!</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
});
