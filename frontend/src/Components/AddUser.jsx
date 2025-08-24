import React,{ useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios'

const URL = "http://localhost:5000/users";
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const AddUser = (props) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetchHandler().then((data) => setUserData(data.users));
  }, []);
  return (
    <>
      <Navbar />
      <h2>Add User</h2>
    </>
  );
};

export default AddUser;
