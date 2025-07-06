import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faInfoCircle, faCalendarAlt, faCoins, faLaptop, faTrophy, faBed,
  faEllipsisH, faArrowRightToBracket, faUsers, faGamepad, faMapMarkerAlt as faMapMarker
} from '@fortawesome/free-solid-svg-icons';

// Add CSS animations for smooth popup interactions
const popupStyles = `
  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .popup-menu {
    animation: fadeIn 300ms ease-out forwards;
  }
  
  .menu-item {
    animation: slideInFromLeft 300ms ease-out forwards;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="navbar">
      <div className="menu-icon" onClick={handleToggle}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
      {isOpen && (
        <div className="popup-menu" ref={menuRef}>
          <div className="menu-item" onClick={() => handleNavigation('/')}>
            <FontAwesomeIcon icon={faHome} /> Home
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/about')}>
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/events')}>
            <FontAwesomeIcon icon={faCalendarAlt} /> Events
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/donate')}>
            <FontAwesomeIcon icon={faCoins} /> Donate
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/projects')}>
            <FontAwesomeIcon icon={faLaptop} /> Projects
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/achievements')}>
            <FontAwesomeIcon icon={faTrophy} /> Achievements
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/accommodation')}>
            <FontAwesomeIcon icon={faBed} /> Accommodation
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/login')}>
            <FontAwesomeIcon icon={faArrowRightToBracket} /> Login
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/team')}>
            <FontAwesomeIcon icon={faUsers} /> Team
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/games')}>
            <FontAwesomeIcon icon={faGamepad} /> Games
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/location')}>
            <FontAwesomeIcon icon={faMapMarker} /> Location
          </div>
        </div>
      )}
      <style>{popupStyles}</style>
    </div>
  );
};

export default Navbar;