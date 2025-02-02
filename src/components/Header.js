import React from "react";
import "../styles/Header.css";
import { FaSearch } from "react-icons/fa"; // Importing the search icon

function Header({ handleCityClick }) {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img src="logo.jpg" alt="Logo" className="logo" />
        <button className="city-name-button" onClick={handleCityClick}>
          City Name
        </button>
      </div>
      <div className="search-container">
        <button className="search-button">
          <FaSearch /> {/* Displaying search icon */}
        </button>
      </div>
    </div>
  );
}

export default Header;
