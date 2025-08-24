import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import '../Styles/addUser.css';
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate('/userdetails'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/users", {
      name: String(inputs.name),
      gmail: String(inputs.gmail),
      age: Number(inputs.age),
      address: String(inputs.address)
    }).then(res => res.data);
  }

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Add a New User</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} value={inputs.name} required />
          <label>Email</label>
          <input type="email" name="gmail" onChange={handleChange} value={inputs.gmail} required />
          <label>Age</label>
          <input type="number" name="age" onChange={handleChange} value={inputs.age} required />
          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address} required />
          <button type="submit">Add User</button>
        </form>
      </div>
    </>
  );
};

export default AddUser;