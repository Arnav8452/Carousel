import React from "react";
import "../styles/Rentals.css";

const events = [
  {
    id: 1,
    src: "/img-5.png", // Correct image path
  },
  {
    id: 2,
    src: "/img-7.png",
  },
  {
    id: 3,
    src: "/img-6.png",
  },
  // Add more events as needed
];

const App = () => {
  return (
    <div className="App">
      <div>Cabs, Rentals, Flights and much more..</div>
      <div className="event-cards-container">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img
              src={event.src} // Use 'src' instead of 'imageUrl'
              alt={event.title}
              className="event-card-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
