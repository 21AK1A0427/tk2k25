import React, { useState, useRef, useEffect } from 'react';
import '../../styles/user/AdminDashboard.css';
import AdminEvents from './AdminEvents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faCalendarAlt, faUsers, faCog, faBell, faCommentDots, faUserCircle, faSignOutAlt, faBars, faTimes // Added faBars and faTimes
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import TrishnaLogo from '../../assets/images/trishna.png'; // Import the logo

// Simple Modal Component (can be moved to its own file if preferred)
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`logout-modal-overlay ${isOpen ? 'active' : ''}`}> {/* Added active class toggle */}
      <div className="logout-modal-content">
        <h4>Logout Confirmation</h4>
        <p>Are you sure you want to logout?</p>
        <div className="logout-modal-actions">
          {/* Using sci-fi-button class for consistency if desired, or specific classes */}
          <button onClick={onConfirm} className="sci-fi-button confirm-logout-button">Yes, Logout</button>
          <button onClick={onClose} className="sci-fi-button cancel-logout-button">No, Cancel</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarWidth, setSidebarWidth] = useState(60); // Initial width for collapsed state
  const [isResizing, setIsResizing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for modal
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Start with sidebar collapsed
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleNavClick = (page, event) => {
    event.preventDefault();
    setActivePage(page);
  };

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing && sidebarRef.current) {
        let newWidth = mouseMoveEvent.clientX;
        if (newWidth > 180 && newWidth < 500) { // Min 180px, Max 500px
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const handleLogoutRequest = () => {
    setShowLogoutModal(true); // Show the modal
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    // Perform any actual logout logic here (e.g., clearing tokens, API calls)
    navigate('/'); // Redirect to home page (Hero.jsx)
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const toggleSidebar = () => {
    const newCollapsedState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newCollapsedState);
    if (newCollapsedState) {
      // Collapsing
      setSidebarWidth(60);
    } else {
      // Expanding
      setSidebarWidth(250); // Set to default expanded width
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'events':
        return <AdminEvents />;
      case 'dashboard':
      default:
        return (
          <div className="dashboard-welcome">
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className={`admin-dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div
        ref={sidebarRef}
        className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
        style={{ width: `${isSidebarCollapsed ? 60 : sidebarWidth}px` }}
      >
        <div className="admin-sidebar-header">
          <button onClick={toggleSidebar} className="sidebar-toggle-button">
            <FontAwesomeIcon icon={isSidebarCollapsed ? faBars : faTimes} />
          </button>
        </div>
        <nav className="admin-nav">
          <ul>
            <li>
              <a href="#" onClick={(e) => handleNavClick('dashboard', e)} className={activePage === 'dashboard' ? 'active' : ''}>
                <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" /> <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('events', e)} className={activePage === 'events' ? 'active' : ''}>
                <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" /> <span className="nav-text">Events</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('users', e)} className={activePage === 'users' ? 'active' : ''}>
                <FontAwesomeIcon icon={faUsers} className="nav-icon" /> <span className="nav-text">Users</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('settings', e)} className={activePage === 'settings' ? 'active' : ''}>
                <FontAwesomeIcon icon={faCog} className="nav-icon" /> <span className="nav-text">Settings</span>
              </a>
            </li>
            
          </ul>
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={handleLogoutRequest} className="sidebar-logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> <span className="nav-text">Logout</span>
          </button>
        </div>
            
        {!isSidebarCollapsed && (
          <div
            className="sidebar-resizer"
            onMouseDown={startResizing} // Attach onMouseDown to the resizer element
          />
        )}
        
        
               
      </div>

      <div className="admin-main-content" style={{ marginLeft: `${isSidebarCollapsed ? 60 : sidebarWidth}px` }}>
        <header className="admin-header">
          <div className="header-logo">
            <img src={TrishnaLogo} alt="Trishna Logo" /> 
          </div>
          <div className="header-title">
            <span>Admin Panel</span>
          </div>
          <div className="header-icons">
            <button className="icon-button" aria-label="Notifications">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button className="icon-button" aria-label="Chat">
              <FontAwesomeIcon icon={faCommentDots} />
            </button>
            <button className="icon-button" aria-label="Admin Profile">
              <FontAwesomeIcon icon={faUserCircle} />
            </button>
            
          </div>

        </header>
        <div className="admin-content-area">
          {renderContent()}
        </div>
        <footer className="admin-footer">
          <p>&copy; {new Date().getFullYear()} TRISHNA 2K25. All rights reserved.</p>
          
        </footer>
      </div>
      {/* Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default AdminDashboard;
