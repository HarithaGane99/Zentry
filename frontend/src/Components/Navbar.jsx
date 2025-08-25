import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Zentry</h2>
      <ul className='home-ul'>
        <li className='home ll'><Link to="/">Home</Link></li>
        <li className='about ll'><Link to="/adduser">Add User</Link></li>
        <li className='contact ll'><Link to="/userdetails">User Details</Link></li>
        <li className='register ll'><Link to="/register">Register</Link></li>
        
      </ul>
    </div>
  )
}

export default Navbar