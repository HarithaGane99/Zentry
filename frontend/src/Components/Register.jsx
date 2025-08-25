import React from "react";
import "../Styles/register.css";
import Navbar from "./Navbar";

const Register = () => {
  return (
    <>
    <Navbar />
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
      <form className="register-form">
        <input
          type="text"
          placeholder="Full Name"
          className="register-input"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
        />
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
    </>
    
  );
};

export default Register;
