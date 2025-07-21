import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Home from "./Page/Home";
import ClassesPage from "./Page/Class";
import Layout from "./MainLayout";
import ExamLayout from "./layout/ExamLayout";
import CreateExam from "./Page/CreateExam";
import ExamDetail from "./Page/ExamDetail";
import Exam from "./Page/Exam";

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
