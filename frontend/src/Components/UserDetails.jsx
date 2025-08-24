import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import '../Styles/userDetails.css';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const UserDetails = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  return (
    <>
      <Navbar />
      <div className="table-container">
        <h2>User Details</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, i) => (
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.gmail}</td>
                <td>{user.age}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserDetails;