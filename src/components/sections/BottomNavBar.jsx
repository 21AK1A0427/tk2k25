 import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faInfoCircle, faCalendarAlt, faCoins, faLaptop, faTrophy, faBed,
  faEllipsisH, faArrowRightToBracket, faUsers, faGamepad, faMapMarkerAlt as faMapMarker
} from '@fortawesome/free-solid-svg-icons';



// Constants for menu items with contextual hover colors
const MENU_ITEMS_BASE = [
  { label: 'Home', url: '/', icon: faHome, hoverColor: 'hover:text-blue-500' }, // Blue for home/trust
  { label: 'About', url: '/about', icon: faInfoCircle, hoverColor: 'hover:text-sky-500' }, // Sky blue for information
  { label: 'Events', url: '/events', icon: faCalendarAlt, hoverColor: 'hover:text-violet-500' }, // Violet for events/celebration
  { label: 'Sponsors', url: '/sponsors', icon: faCoins, hoverColor: 'hover:text-yellow-400' }, // Yellow/gold for money/sponsors
  { label: 'Workshops', url: '/workshops', icon: faLaptop, hoverColor: 'hover:text-orange-500' }, // Orange for learning/workshops
 { label: 'Schedule', url: '/schedule', icon: faCalendarAlt, hoverColor: 'hover:text-rose-500' }, // Green for schedules/checkmarks

];

const MORE_SUB_ITEMS_FA = [
   { label: 'Contests', url: '/contests', icon: faTrophy, hoverColor: 'hover:text-amber-500' }, // Amber/gold for trophies/contests
  { label: 'Team', url: '/team', icon: faUsers, hoverColor: 'hover:text-indigo-500' }, // Indigo for teamwork/collaboration
  { label: 'Playground', url: '/playground', icon: faGamepad, hoverColor: 'hover:text-orange-500' }, // Red for gaming/energy
  { label: 'Stay', url: '/stay', icon: faBed, hoverColor: 'hover:text-pink-500' }, // Rose for comfort/accommodation
  { label: 'Location', url: '/location', icon: faMapMarker, hoverColor: 'hover:text-emerald-500' }, // Emerald for maps/location
];

const LOGIN_ITEM = { label: 'Login', url: '/login', icon: faArrowRightToBracket, hoverColor: 'hover:text-cyan-500' }; // Cyan for login/access
const MORE_CONFIG = { label: 'More', icon: faEllipsisH, hoverColor: 'hover:text-gray-500' }; // Gray for additional options

const BottomNavBar = () => {
  const [setAboutOpen] = useState(false);
  const [showMorePopup, setShowMorePopup] = useState(false);
  const moreButtonRef = useRef(null);
  const morePopupRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth < 768);
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleAboutOpen = () => setAboutOpen(true);
  const handleAboutClose = () => setAboutOpen(false);

  const handleMoreClick = () => {
    setShowMorePopup(prev => !prev);
  };

  const handleNavItemClick = (item) => {
    if (item.action === 'modal' && item.label === 'About') {
      handleAboutOpen();
    } else if (item.url) {
      navigate(item.url);
    }
    if (showMorePopup) {
      setShowMorePopup(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        morePopupRef.current &&
        !morePopupRef.current.contains(event.target) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target)
      ) {
        setShowMorePopup(false);
      }
    };

    if (showMorePopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMorePopup]);

  const itemsToDisplayInBar = useMemo(() => {
    if (isMobileView) {
      return MENU_ITEMS_BASE.slice(0, 3);
    }
    return MENU_ITEMS_BASE;
  }, [isMobileView]);

  const itemsForMorePopup = useMemo(() => {
    let popupContent = [];
    if (isMobileView) {
      const hiddenBaseItems = MENU_ITEMS_BASE.slice(3);
      popupContent = [...hiddenBaseItems, ...MORE_SUB_ITEMS_FA];
    } else {
      popupContent = [...MORE_SUB_ITEMS_FA];
    }
    return popupContent.filter(item => item);
  }, [isMobileView]);

  return (
    <>
      <style>{`
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
        
        .popup-menu-enter {
          animation: fadeIn 300ms ease-out forwards;
        }
        
        /* Custom scrollbar for popup */
        .styled-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
      
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex items-center justify-center p-2 space-x-2" style={{ backdropFilter: 'blur(20px)', background: 'rgba(0, 0, 0, 0.15)' }}>
        {itemsToDisplayInBar.map((item) => {
          const commonButtonClasses = `relative flex flex-col items-center text-white/90 ${item.hoverColor} px-2 py-1.5 rounded-xl transition-all duration-300 group focus:outline-none hover:bg-white/10 hover:backdrop-blur-sm`;
          const labelClasses = "text-xs font-medium tracking-wide";

          return (
            <button
              key={item.label}
              onClick={() => handleNavItemClick(item)}
              className={commonButtonClasses}
              title={item.label}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg mb-0.5 group-hover:scale-110 transition-all duration-300" />
              <span className={labelClasses}>{item.label}</span>
            </button>
          );
        })}

        {itemsForMorePopup.length > 0 && (
          <div className="relative">
            <button
              ref={moreButtonRef}
              onClick={handleMoreClick}
              className={`relative flex flex-col items-center text-white/90 ${MORE_CONFIG.hoverColor} px-2 py-1.5 rounded-xl transition-all duration-300 group focus:outline-none hover:bg-white/10 hover:backdrop-blur-sm`}
              title={MORE_CONFIG.label}
              aria-haspopup="true"
              aria-expanded={showMorePopup}
            >
              <FontAwesomeIcon icon={MORE_CONFIG.icon} className="text-lg mb-0.5 group-hover:scale-110 transition-all duration-300" />
              <span className="text-xs font-medium tracking-wide">{MORE_CONFIG.label}</span>
            </button>
            {showMorePopup && (
              <div
                ref={morePopupRef}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-3 z-[100] max-h-[70vh] overflow-y-auto transition-all duration-300 ease-out transform animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2"
                style={{ 
                  backdropFilter: 'blur(20px)', 
                  background: 'rgba(0, 0, 0, 0.95)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
                role="menu"
              >
                {/* Header */}
                <div className="mb-3 pb-2 border-b border-white/10">
                  <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Navigation Menu</h3>
                </div>
                
                {/* Menu Items Grid */}
                <div className="space-y-1">
                  {itemsForMorePopup.map((subItem, index) => (
                    <button
                      key={subItem.label}
                      onClick={() => handleNavItemClick(subItem)}
                      className={`relative flex items-center gap-3 w-full px-4 py-3 text-sm text-white/90 ${subItem.hoverColor} hover:bg-white/10 hover:backdrop-blur-sm rounded-lg transition-all duration-200 ease-out group focus:outline-none focus:ring-2 focus:ring-white/20`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: 'slideInFromLeft 300ms ease-out forwards'
                      }}
                      role="menuitem"
                    >
                      {/* Icon Container */}
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-200">
                        <FontAwesomeIcon 
                          icon={subItem.icon} 
                          className="text-sm text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-200" 
                        />
                      </div>
                      
                      {/* Label */}
                      <span className="font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-200">
                        {subItem.label}
                      </span>
                      
                      {/* Hover Indicator */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="mt-3 pt-2 border-t border-white/10">
                  <p className="text-xs text-white/40 text-center">
                    {itemsForMorePopup.length} menu items
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          key={LOGIN_ITEM.label}
          onClick={() => handleNavItemClick(LOGIN_ITEM)}
          className={`relative flex flex-col items-center text-white/90 ${LOGIN_ITEM.hoverColor} px-2 py-1.5 rounded-xl transition-all duration-300 group focus:outline-none hover:bg-white/10 hover:backdrop-blur-sm`}
          title={LOGIN_ITEM.label}
        >
          <FontAwesomeIcon icon={LOGIN_ITEM.icon} className="text-lg mb-0.5 group-hover:scale-110 transition-all duration-300" />
          <span className="text-xs font-medium tracking-wide">{LOGIN_ITEM.label}</span>
        </button>
      </nav>

      
            
      
    </>
  );
};

export default BottomNavBar;
