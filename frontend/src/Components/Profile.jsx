import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../Styles/profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', gmail: '', age: '', address: '', phone: '' });
  const { user } = useContext(AuthContext);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/users/profile');
      setProfileData(res.data);
      setFormData(res.data); // Pre-fill form data
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/users/profile', formData);
      alert('Profile updated successfully!');
      setIsEditing(false); // Exit edit mode
      fetchProfile(); // Refresh profile data
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile.');
    }
  };


  if (loading) {
    return <div className="loading-message">Loading Profile...</div>;
  }

  if (!profileData) {
    return <div className="error-message">Could not load profile.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">My Profile</h2>
        <button onClick={() => setIsEditing(!isEditing)} className="edit-toggle-btn">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        // EDITING VIEW
        <form className="profile-form" onSubmit={handleUpdateSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          
          <label>Email</label>
          <input type="email" name="gmail" value={formData.gmail} onChange={handleInputChange} />

          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} />

          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
          
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
          
          <button type="submit" className="update-btn">Save Changes</button>
        </form>
      ) : (
        // VIEWING VIEW
        <div className="profile-card">
          <div className="profile-item">
            <span className="profile-label">Name:</span>
            <span className="profile-value">{profileData.name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{profileData.gmail}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Age:</span>
            <span className="profile-value">{profileData.age}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Address:</span>
            <span className="profile-value">{profileData.address}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Phone:</span>
            <span className="profile-value">{profileData.phone}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Role:</span>
            <span className="profile-value role-badge">{profileData.role}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;