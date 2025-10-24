
// import './App.css'

import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Task from './pages/Task'


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </Router>
  )
}

export default App