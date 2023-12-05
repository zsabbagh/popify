import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPresenter from "./presenters/loginPresenter";
import UserModel from "./interfaces";

// reactive usermodel

//TODO add type to props when needed.
const Router = (props: {userModel: UserModel}) => {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<>Home</>} />
          <Route path="/statistics" element={<>Statistics here</>} />
          <Route path="/quiz" element={<>Quizzes here</>} />
          <Route path="/login" element={<LoginPresenter model={props.userModel}/>} />
          <Route path="*" element={<>404, page not found!</>} />
      </Routes>
    </BrowserRouter>
  );
};


export default Router;