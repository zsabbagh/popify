import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import loginUrl from '../utils/spotifyAuthorization';
import SpotifyResponseHandler from '../handlers/SpotifyResponseHandler';
import { observer } from 'mobx-react-lite';
import Topbar from './TopbarPresenter';
import TopItems from './TopItemsPresenter';
import Index from '../presenters/IndexPresenter';
import Recommendations from './RecommendationPresenter';
import Search from './SearchPresenter';
import { Model } from '../interfaces';
import ArtistPresenter from './ArtistPresenter';
import { useEffect } from 'react';

interface Props {
  model: Model;
}

const settings = ['Logout'];

export default observer(function Router(props: Props) {
  useEffect(() => {
    props.model.loginUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Topbar pages={props.model.pages} settings={settings} model={props.model} />
        {props.model.userState.user ? (
          // If user is truthy, render all the routes
          <Routes>
            <Route index element={<Index model={props.model} />} />
            <Route path="/top" element={<TopItems model={props.model} />} />
            <Route path="/quiz" element={<>Quizzes here</>} />
            <Route path="/recommendations" element={<Recommendations model={props.model} />} />
            <Route path="/spotifyResponse" element={<SpotifyResponseHandler model={props.model} />} />
            <Route path="/search" element={<Search model={props.model}></Search>} />
            <Route path="/artist/:id" element={<ArtistPresenter model={props.model} />} />
            <Route path="*" element={<>404, page not found!</>} />
          </Routes>
        ) : (
          // If user is falsy, render only the index route
          <Routes>
            <Route path="/spotifyResponse" element={<SpotifyResponseHandler model={props.model} />} />

            <Route path="*" element={<Index model={props.model} />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
});
