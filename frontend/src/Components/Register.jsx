/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import "../Styles/register.css";
import { useNavigate } from "react-router-dom";


function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    password: "",
    phone: "",
    address: "",
    age: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!inputs.gmail) {
      alert("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputs.gmail)) {
      alert("Email is invalid");
      isValid = false;
    }

    if (isValid) {
      await sendRequest().then(() => navigate('/userdetails'));
    }
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users", {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        password: String(inputs.password),
        phone: String(inputs.phone),
        address: String(inputs.address),
        age: Number(inputs.age)
      });

      if (response.status === 201) {
        window.alert("Register successfully!");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An error occurred while creating the account.");
      }
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create an Account</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="register-input"
          required
          value={inputs.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="gmail"
          placeholder="Email"
          className="register-input"
          required
          value={inputs.gmail}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          className="register-input"
          required
          value={inputs.password}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="0771245896"
          className="register-input"
          required
          maxLength="10"
          pattern="[0-9]{10}"
          title="Please enter exactly 10 digits."
          onChange={handleChange}
          value={inputs.phone}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          className="register-input"
          required
          value={inputs.age}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="address"
          rows={2}
          className="register-input"
          required
          value={inputs.address}
          onChange={handleChange}
        />

        <button type="submit" className="register-btn">
          Create an account
        </button>

        <p className="register-footer">
          Already have an account?{" "}
          <a href="/" className="register-link">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;