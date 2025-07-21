import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassListPage from "./Page/Teacher/ClassListPage";
import CreateClassPage from "./Page/Teacher/CreateClassPage";

function indexClass() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/classes" element={<ClassListPage />} />
        <Route path="/classes/create" element={<CreateClassPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default indexClass;
