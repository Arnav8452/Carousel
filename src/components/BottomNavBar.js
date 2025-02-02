import React, { useState, useEffect, useRef } from 'react';
import '../styles/BottomNavBar.css'; // Make sure the CSS file is saved in the correct path

const BottomNavBar = ({ setActivePage }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lightRef = useRef(null);

  const links = [
    { icon: 'bx bx-home-alt-2', color: '--heart-icon-color', page: 'home' },
    { icon: 'bx bx-spreadsheet', color: '--home-icon-color', page: 'profile' },
    { icon: 'bx bx-plus-circle', color: '--plus-icon-color', page: 'add' },
    { icon: 'bx bx-map', color: '--bell-icon-color', page: 'map' },
    { icon: 'bx bx-user', color: '--user-icon-color', page: 'user' },
  ];

  const handleClick = (index, offsetLeft, offsetWidth, page) => {
    setActiveIndex(index);
    setActivePage(page); // Set the active page in App.js
    const light = lightRef.current;
    if (light) {
      light.style.left = `${offsetLeft - offsetWidth / 4}px`;
    }
  };

  useEffect(() => {
    const activeLink = document.querySelectorAll('.nav__link')[activeIndex];
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink.firstChild.getBoundingClientRect();
      handleClick(activeIndex, offsetLeft, offsetWidth, links[activeIndex].page);
    }
  }, [activeIndex]);

  return (
    <nav className="nav">
      <ul className="nav__links">
        {links.map((link, index) => (
          <li
            key={index}
            className={`nav__link ${index === activeIndex ? 'active' : ''}`}
            onClick={(e) =>
              handleClick(index, e.currentTarget.offsetLeft, e.currentTarget.offsetWidth, link.page)
            }
          >
            <a href="#" style={{ '--icon-color': `var(${link.color})` }}>
              {link.icon ? (
                <i className={link.icon}></i>
              ) : (
                <span className="nav__text">{link.label}</span>
              )}
            </a>
          </li>
        ))}
        <div ref={lightRef} className="nav__light"></div>
      </ul>
    </nav>
  );
};

export default BottomNavBar;
