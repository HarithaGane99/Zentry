import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const AuthContext = createContext();

// Create Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for user on initial render
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      // Set the token for all future axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${foundUser.token}`;
    }
  }, []);

  // Login function
  const login = async (gmail, password) => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        gmail,
        password,
      });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        // Set the token for all future axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      console.error("Login failed", error.response.data);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};