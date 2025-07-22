
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./modules/client/pages/Login"; 
import Register from "./modules/client/pages/Register";
import Home from "./modules/client/pages/Home";
import ClassesPage from "./modules/client/pages/Class";
import Layout from "./MainLayout";
import ExamLayout from "./layouts/ExamLayout";
import CreateExam from "./modules/client/pages/CreateExam";
import ExamDetail from "./modules/client/pages/ExamDetail";
import Exam from "./modules/client/pages/Exam";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/exam" element={<ExamLayout />}>
            <Route index element={<Exam />} />
            <Route path="create" element={<CreateExam />} />
            <Route path=":id" element={<ExamDetail />} />
          </Route>
          <Route path="/class" element={<ClassesPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
