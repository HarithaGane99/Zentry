import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "../Styles/userDetails.css";
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/users";

// Fetch all users
const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [] };
  }
};

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  // Load users from backend
  const getUsers = async () => {
    const data = await fetchHandler();
    setUsers(data.users || []);
    setNoResults((data.users || []).length === 0);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Delete user
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      getUsers(); // Refresh after delete
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Search handler
  const handleSearch = async () => {
    const data = await fetchHandler();
    const filteredUsers = data.users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };

  return (
    <>
      <Navbar />
      <div className="search-container">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search by name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {noResults ? (
        <div>
          <p className="no-results">No users found.</p>
        </div>
      ) : (
        <div className="table-container">
          <h2>User Details</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Address</th>
                <th className="no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td> {/* Changed from gmail → email */}
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td className="no-print">
                    <Link to={`/updateuser/${user._id}`}>
                      <button className="update-btn">Update</button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserDetails;

