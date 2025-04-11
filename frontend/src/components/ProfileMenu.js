import React, { useState, useRef, useEffect } from 'react';
import './ProfileMenu.css';

function ProfileMenu({ onViewProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  const handleViewProfile = () => {
    setIsOpen(false);
    onViewProfile();
  };

  return (
    <div className="profile-menu-container" ref={menuRef}>
      <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <button className="theme-toggle">🌙</button>
        <div className="avatar">👤</div>
      </div>
      
      {isOpen && (
        <div className="profile-dropdown">
          <button className="dropdown-item" onClick={handleViewProfile}>
            View Profile
          </button>
          <button className="dropdown-item" onClick={() => setIsOpen(false)}>
            Settings
          </button>
          <button className="dropdown-item logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu; 