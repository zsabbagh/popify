import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import SpotifyResponseHandler from '../handlers/SpotifyResponseHandler';
import { observer } from 'mobx-react-lite';
import Topbar from './TopbarPresenter';
import Statistics from './StatisticsPresenter';
import Index from '../presenters/IndexPresenter';
import Recommendations from './RecommendationPresenter';
import Search from './SearchPresenter';
import { Model } from '../interfaces';

interface Props {
  model: Model;
}

const settings = ["Logout"];

export default observer(function Router(props: Props) {
  props.model.loginUser();
  console.log('user', props.model.userState);

  return (
    <>
      <BrowserRouter>

      <Topbar pages={props.model.pages} settings={settings} model={props.model}/>
        <Routes>
          <Route index element={<Index model={props.model} />} />
          <Route path="/statistics" element={<Statistics model={props.model} />} />
          <Route path="/quiz" element={<>Quizzes here</>} />
          <Route path="/recommendations" element={<Recommendations model={props.model.userState}/>} />
          <Route path="/spotifyResponse" element={<SpotifyResponseHandler model={props.model} />} />
          <Route path="/search" element={<Search model={props.model}></Search>} />
          <Route path="*" element={<>404, page not found!</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
});
