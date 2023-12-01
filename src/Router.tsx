import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPresenter from "./presenters/loginPresenter";
import loginUrl from "./spotifyAuthorization";

//TODO add type to props when needed.
const Router = (props: any) => {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<a href={loginUrl}>login</a>} />
          <Route path="/statistics" element={<>Statistics here</>} />
          <Route path="/quiz" element={<>Quizzes here</>} />
          <Route path="/login" element={<LoginPresenter/>} />
          <Route path="*" element={<>404, page not found!</>} />
      </Routes>
    </BrowserRouter>
  );
};


export default Router;