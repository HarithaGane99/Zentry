import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import AddUser from "./Components/AddUser";
import AdminDashboard from "./Components/AdminDashboard"; // Renamed
import UpdateUser from "./Components/UpdateUser";
import Register from "./Components/Register";
import Profile from "./Components/Profile"; // New component
import Navbar from "./Components/Navbar"; // Import Navbar
import UserProtectedRoute from "./Components/UserProtectedRoute"; // Import Protector
import AdminProtectedRoute from "./Components/AdminProtectedRoute"; // Import Protector

function App() {
  return (
    <div className="app-background">
      <Navbar /> {/* Display Navbar on all pages */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/updateuser/:id" element={<UpdateUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;