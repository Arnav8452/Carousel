import React, { useState, useEffect } from 'react';
import ColorThief from 'colorthief'; // Assuming you've installed this for the dominant color
import '../styles/Carousel.css'; // Include your CSS for styling

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [dominantColor, setDominantColor] = useState([0, 0, 0]); // Store dominant color
  const slides = [
    {
      src: '/img-1.jpg',
      alt: 'Joker movie poster',
    },
    {
      src: '/img-2.jpg',
      alt: 'Baby Driver movie poster',
    },
    {
      src: '/img-3.jpg',
      alt: 'movie poster',
    },
  ];

  // Preload images to ensure they are ready for color extraction
  const preloadImages = (images) => {
    images.forEach((img) => {
      const image = new Image();
      image.src = img.src; // preload image
    });
  };

  useEffect(() => {
    preloadImages(slides); // Preload all images
  }, []);

  // Auto-slide function (change slide every 6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  // Handle previous and next slide
  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Get dominant color using ColorThief
  const getDominantColor = (img) => {
    const colorThief = new ColorThief();

    return new Promise((resolve, reject) => {
      if (img.complete && img.naturalWidth !== 0) {
        try {
          const color = colorThief.getColor(img);
          resolve(color);
        } catch (error) {
          reject(error);
        }
      } else {
        img.onload = () => {
          try {
            const color = colorThief.getColor(img);
            resolve(color);
          } catch (error) {
            reject(error);
          }
        };

        img.onerror = reject;
      }
    });
  };

 // Function to update the entire app's background
const changeBGColor = (color) => {
  const appElement = document.querySelector('.App'); // Target the main app container
  
  // Apply the gradient as background to the app container
  appElement.style.background = `linear-gradient(
    to bottom right, 
    rgb(15, 15, 15) 50%, 
    rgb(${color[0]}, ${color[1]}, ${color[2]})
  )`;

  // Ensure the background scales to fit
  appElement.style.backgroundSize = "cover";
  
  // Cover the full app container
  appElement.style.height = "100vh";
  appElement.style.width = "100vw";

  // Remove any default margins or paddings
  appElement.style.margin = "0";
  appElement.style.padding = "0";

  // Add smooth transition effect for better user experience
  appElement.style.transition = "background 0.5s ease-in-out";
};



  // Use effect to update background color when slide changes
  useEffect(() => {
    const img = document.querySelector('.carrousel-item-visible .carrousel-item-img');
    
    if (img) {
      getDominantColor(img).then((color) => {
        if (color) {
          setDominantColor(color); // Store dominant color
          changeBGColor(color); // Change background color
        }
      }).catch(error => {
        console.error("Error extracting dominant color:", error);
      });
    }
  }, [slideIndex]); // Re-run when slideIndex changes

  return (
    <div className="carrousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carrousel-item ${slideIndex === index ? 'carrousel-item-visible' : ''}`}
        >
          <img
            className="carrousel-item-img"
            src={slide.src}
            alt={slide.alt}
            loading="lazy" // Lazy load images
          />
        </div>
      ))}
      <div className="carrousel-actions">
        <button
          className="btn btn-carrousel"
          id="carrousel-btn-prev"
          aria-label="Previous slide"
          onClick={prevSlide}
        >
         ←
        </button>
        <button
          className="btn btn-carrousel"
          id="carrousel-btn-next"
          aria-label="Next slide"
          onClick={nextSlide}
        >
        →
        </button>
      </div>
    </div>
  );
};

export default Carousel;
