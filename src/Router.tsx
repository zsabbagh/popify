import { BrowserRouter, Routes, Route } from "react-router-dom";

//TODO add type to props when needed.
const Router = (props: any) => {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<>Home page</>} />
          <Route path="/statistics" element={<>Statistics here</>} />
          <Route path="/quiz" element={<>Quizzes here</>} />
          <Route path="*" element={<>404, page not found!</>} />
      </Routes>
    </BrowserRouter>
  );
};


export default Router;