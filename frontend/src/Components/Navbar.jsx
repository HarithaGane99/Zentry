import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <div className="navbar">
      <Link to="/" style={{textDecoration: 'none'}}><h2>Zentry</h2></Link>
      <ul className="home-ul">
        {user ? (
          <>
            {user.role === 'admin' && (
              <>
                <li><Link to="/admin-dashboard">Dashboard</Link></li>
                <li><Link to="/adduser">Add User</Link></li>
              </>
            )}
            {user.role === 'user' && (
              <li><Link to="/profile">My Profile</Link></li>
            )}
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;