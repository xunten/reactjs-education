import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './Page/Login'
import Register from './Page/Register'
import Home from './Page/Home'
import Class from './Page/Class'
import Exam from './Page/Exam'
import ClassListPage from './Page/Teacher/ClassListPage'
import CreateClassPage from './Page/Teacher/CreateClassPage'
import ClassDetailPage from './Page/Teacher/ClassDetailPage'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/classes" element={<ClassListPage/>} />
          <Route path="/classes/create" element={<CreateClassPage/>} />
          <Route path="/classes/:id" element={<ClassDetailPage />} />
          
          {/* Redirect all other paths to Home */}

      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
