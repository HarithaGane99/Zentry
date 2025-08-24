import React from "react";
import Navbar from "./Navbar";

const UserDetails = (props) => {
  const {  name, gmail, age, address } = props.user;
  return (
    <>
      <Navbar />
      <h2>User Details</h2>
      <div>
        <h1>Name: {name}</h1>
        <h1>Email: {gmail}</h1>
        <h1>Age: {age}</h1>
        <h1>Address: {address}</h1>
      </div>
    </>
  );
};

export default UserDetails;
