import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-header">
        {/* Gray background section */}
      </div>
      
      <div className="profile-content">
        <div className="profile-image-container">
          <div className="profile-image">
            {/* Placeholder for profile image */}
            <span className="avatar-placeholder">👤</span>
          </div>
        </div>
        
        <div className="profile-details">
          <div className="detail-item">
            <label>Name :</label>
            <span>John Doe</span>
          </div>
          
          <div className="detail-item">
            <label>Board :</label>
            <span>CBSE</span>
          </div>
          
          <div className="detail-item">
            <label>Grade :</label>
            <span>10th</span>
          </div>
          
          <div className="detail-item">
            <label>Email :</label>
            <span>john.doe@example.com</span>
          </div>
          
          <div className="detail-item">
            <label>Phone Number :</label>
            <span>+1 234 567 8900</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 