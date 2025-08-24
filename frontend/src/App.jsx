import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import AddUser from './Components/AddUser'
import UserDetails from './Components/UserDetails'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/userdetails" element={<UserDetails />} />
      </Routes>
    </>
  )
}

export default App

