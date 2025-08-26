/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import "../Styles/register.css"; 

function Register() {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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

    if (!inputs.email) {
      alert("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      alert("Email is invalid");
      isValid = false;
    }

    if (isValid) {
      await sendRequest();
    }
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8081/userData", {
        fullName: inputs.fullName,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        address: inputs.address,
      });

      if (response.status === 200) {
        window.alert("Register successfully!");
        window.location.href = "./";
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
          name="fullName"
          placeholder="Name"
          className="register-input"
          required
          value={inputs.fullName}
          onChange={(e) => {
            const re = /^[A-Za-z\s]*$/;
            if (re.test(e.target.value)) {
              handleChange(e);
            }
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="register-input"
          required
          value={inputs.email}
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
          onChange={(e) => {
            const re = /^[0-9\b]{0,10}$/;
            if (re.test(e.target.value)) {
              handleChange(e);
            }
          }}
          value={inputs.phone}
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

