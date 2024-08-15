import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './settings.css'; // Ensure the path is correct

const SettingsPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // User state
  const [name, setName] = useState('John Doe');
  const [location, setLocation] = useState('New York, USA');
  const [phone, setPhone] = useState('+1234567890');
  const [email, setEmail] = useState('johndoe@example.com');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveProfile = () => {
    // Add logic to save profile updates
    alert('Profile saved');
  };

  const handleSavePassword = () => {
    // Add logic to change password
    alert('Password changed');
  };

  const handleLogout = () => {
    // Clear user session (e.g., remove token from localStorage)
    localStorage.removeItem('userToken'); // Adjust if your token is stored elsewhere
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className="settings-page-container">
      <div className="settings-content">
        <div className="user-info rounded-container">
          <h2>User Info</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email}</p>
          <button className="btn-save" onClick={handleSaveProfile}>Save Profile</button>
        </div>
        <div className="settings rounded-container">
          <h2>Settings</h2>
          <div className="settings-info">
            <label htmlFor="new-password">Change Password:</label>
            <input 
              type="password" 
              id="new-password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="Enter new password"
            />
            <button className="btn-save" onClick={handleSavePassword}>Save Password</button>
          </div>
        </div>
        <div className="improvement-score rounded-container">
          <h2>Improvement Score</h2>
          {/* Improvement score logic */}
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default SettingsPage;
