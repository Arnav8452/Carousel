import React from "react";
import "../styles/Citypopup.css"; // Ensure you style the popup here

const CityPopup = ({ isOpen, onClose, cityLogos }) => {
  if (!isOpen) return null;

  const popularCities = [
    { name: "Delhi NCR", icon: "/logos/delhi.png" },
    { name: "Mumbai", icon: "/logos/mumbai.png" },
    { name: "Bengaluru"},
    { name: "Goa" },
    { name: "Hyderabad", icon: "/logos/hyd.png" },
    { name: "Pune" },
    { name: "Lucknow" },
    { name: "Other places" },
  ];
  
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="header">
          <input
            type="text"
            className="search-bar"
            placeholder="Search city, area, or locality"
          />
        </div>
        <div className="popular-cities">
          <h3 className="section-title">Popular Cities</h3>
          <div className="city-icons">
            {popularCities.map((city) => (
              <div key={city.name} className="city-card">
                <img src={city.icon} alt={`${city.name} icon`} />
                <span>{city.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="close-popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CityPopup;
