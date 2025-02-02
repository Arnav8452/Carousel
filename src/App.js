import React, { useState } from "react";
import HorizontalMenu from "./components/HorizontalMenu";
import Rentals from "./components/Rentals";
import BottomNavBar from "./components/BottomNavBar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import CityPopup from "./components/Citypopup";
import Header from "./components/Header";
import Acc from "./components/Acc";
import NotFound from "./components/NotFound"; 
import "./App.css";

const App = () => {
  const [activePage, setActivePage] = useState("home"); // Track active content
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCityClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const renderContent = () => {
    if (activePage === "map") {
      return (
        <iframe
          src="https://arnav8452.github.io/Maps/" // Replace with your actual map URL
          style={{ width: "100%", height: "100vh", border: "none" }}
          title="Embedded Website"
        ></iframe>
      );
    }

    // Render other pages
    switch (activePage) {
      case "home":
        return (
          <>
            <HorizontalMenu />
            <Carousel />
            <Rentals />
            <Footer />
          </>
        );
      case "user":
        return (
          <>
          <Acc/>
          </>
        );
      case "profile":
        return (
          <>
          <NotFound />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {/* Only show Header on the homepage */}
      {activePage === "home" && <Header handleCityClick={handleCityClick} />}
      
      {renderContent()}

      {activePage !== "map" && <BottomNavBar setActivePage={setActivePage} />}
      
      {isPopupOpen && <CityPopup isOpen={isPopupOpen} onClose={handleClosePopup} />}
    </div>
  );
};

export default App;
