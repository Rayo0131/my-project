
// import './App.css'

import React from 'react'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Signup'
import Task from './pages/Task'
import Navbar from './components/Navbar'


const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App