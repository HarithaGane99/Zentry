import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "../Styles/userDetails.css";
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const UserDetails = () => {
  const [users, setUsers] = useState();

  // Function to fetch and set users
  const getUsers = () => {
    fetchHandler().then((data) => setUsers(data.users));
  };

  useEffect(() => {
    getUsers(); // Initial fetch
  }, []);

  const deleteHandler = async (id) => {
    await axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((res) => res.data)
      .then(() => {
        // After deleting, re-fetch the users to update the table
        getUsers();
      });
  };

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, i) => (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.gmail}</td>
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/updateuser/${user._id}`}>
                        <button className="update-btn">Update</button>
                      </Link>
                      <button
                        className="delete-btn"
                        onClick={() => deleteHandler(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserDetails;
