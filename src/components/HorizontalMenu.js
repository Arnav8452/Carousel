import React from 'react';
import '../styles/HorizontalMenu.css';

const HorizontalMenu = () => {
  const menuItems = [
    { label: 'Events', icon: '🎉' },
    { label: 'College Fests', icon: '🏫' },
    { label: 'Stand-ups', icon: '🎤' },
    { label: 'Hotels', icon: '🏨' },
    { label: 'Rides', icon: '🚗' },
    { label: 'Explore All', icon: '🌍' },
  ];

  return (
    <div className="horizontal-menu">
      {menuItems.map((item, index) => (
        <div key={index} className="menu-item">
          <span className="menu-icon">{item.icon}</span>
          <span className="menu-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default HorizontalMenu;
