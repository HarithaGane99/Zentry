import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If no user, redirect to login page
    return <Navigate to="/" />;
  }

  // If user is logged in, render the child component
  return <Outlet />;
};

export default UserProtectedRoute;