import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import AddUser from "./Components/AddUser";
import UserDetails from "./Components/UserDetails";
import UpdateUser from "./Components/UpdateUser";

function App() {
  return (
    <div className="app-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/updateuser/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
