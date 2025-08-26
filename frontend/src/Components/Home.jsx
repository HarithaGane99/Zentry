import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Styles/login.css'; // We'll create this CSS file next

const Home = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loggedInUser = await login(gmail, password);
      // Redirect based on role
      if (loggedInUser.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  // If user is already logged in, redirect them
  if (user) {
    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/profile');
    }
    return null; // Render nothing while redirecting
  }


  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Welcome to Zentry</h1>
        <h2 className="login-subtitle">Please sign in to continue</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="login-footer">
            Don't have an account?{' '}
            <Link to="/register" className="login-link">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Home;