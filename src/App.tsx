import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './Page/Login'
import Register from './Page/Register'
import Home from './Page/Home'
import Class from './Page/Class'
import Exam from './Page/Exam'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/class" element={<Class />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
