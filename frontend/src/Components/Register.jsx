import { useState, useContext } from "react";
import axios from "axios";
import "../Styles/register.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // We'll use this to log the user in
  
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
      await sendRequest();
    }
  };

  const sendRequest = async () => {
    try {
      // 1. Send registration data to the new public endpoint
      const response = await axios.post("http://localhost:5000/users/register", {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        password: String(inputs.password),
        phone: String(inputs.phone),
        address: String(inputs.address),
        age: Number(inputs.age)
      });

      // 2. If registration is successful, use the response to log the user in
      if (response.data && response.data.token) {
        window.alert("Registered successfully!");

        // 3. Manually update localStorage and AuthContext state
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // This is a trick to make the AuthContext re-read from localStorage
        // A more advanced solution might have a dedicated 'setUser' in context
        window.dispatchEvent(new Event('storage')); 
        
        navigate('/profile'); // Redirect to the user's new profile page
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while creating the account.";
      window.alert(errorMessage);
    }
  };
  
  // A small change to AuthContext is needed to listen for storage events.
  // In frontend/src/context/AuthContext.jsx, add this useEffect:
  /*
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  */


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
          placeholder="Password"
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
          placeholder="Address"
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