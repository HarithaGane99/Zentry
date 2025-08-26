import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/addUser.css'; 

const UpdateUser = () => {
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
        phone: String(inputs.phone),
        password: String(inputs.password)
      })
      .then((res) => res.data);
  };

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

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={inputs.name || ''}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="gmail"
            onChange={handleChange}
            value={inputs.gmail || ''}
            required
          />
          <label>Age</label>
          <input
            type="number"
            name="age"
            onChange={handleChange}
            value={inputs.age || ''}
            required
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={inputs.address || ''}
            required
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={inputs.phone || ''}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={inputs.password || ''}
            required
          />
          <button type="submit">Update User</button>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;