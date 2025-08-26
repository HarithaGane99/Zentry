import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If no user, redirect to login page
    return <Navigate to="/" />;
  }

  if (user.role !== 'admin') {
    // If user is not an admin, redirect to their profile page
    return <Navigate to="/profile" />;
  }
  
  // If user is an admin, render the child component
  return <Outlet />;
};

export default AdminProtectedRoute;