import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPresenter from "./presenters/loginPresenter";
import loginUrl from "./spotifyAuthorization";
import SpotifyResponseHandler from "./utils/SpotifyResponseHandler";
import { observer } from "mobx-react-lite";
import { Model } from "./interfaces";

interface Props {
  model: Model;
}

//TODO add type to props when needed.
export default observer(function Router(props: Props) {
  console.log("user", props.model.user);
  return (
    <>
      {props.model.user ? (
        <>
        <div>{`Current username: ${
          props.model.user.external_urls.spotify
        }`}</div>
        <img src={props.model.user.images[0].url}></img>
      </>) : (
        <></>
      )}
      <BrowserRouter>
        <Routes>
          <Route index element={<a href={loginUrl}>login</a>} />
          <Route path="/statistics" element={<>Statistics here</>} />
          <Route path="/quiz" element={<>Quizzes here</>} />
          <Route path="/login" element={<LoginPresenter />} />
          <Route
            path="/spotifyResponse"
            element={<SpotifyResponseHandler model={props.model} />}
          />
          <Route path="*" element={<>404, page not found!</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
});
