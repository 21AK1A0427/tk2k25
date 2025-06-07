import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.css';
import MatterBackground from '../MatterBackground'; // Import MatterBackground
import AboutPage from './AboutPage';

// Image imports
import nameLogoWhite from '../../assets/images/tk logo.png';
import nameLogo from '../../assets/images/theme pic.png';
import xIcon from '../../assets/images/x.svg';
import phoneIcon from '../../assets/images/phone.svg';
import telegramIcon from '../../assets/images/telegram.svg';
import coderImg from '../../assets/images/about tk.png';
import menuImage from '../../assets/images/search pic.png';

// Social icons
import linkedinIcon from '../../assets/images/linkedin.svg';
import instagramIcon from '../../assets/images/instagram.svg';
import twitterIcon from '../../assets/images/gameicon.png';
import githubIcon from '../../assets/images/userbg.png';

const SOCIAL_ICONS = [
  { key: 'linkedin', icon: linkedinIcon, url: 'https://www.linkedin.com/in/anurag-singh-web-developer/', alt: 'LinkedIn' },
  { key: 'instagram', icon: instagramIcon, url: 'https://www.instagram.com/procodrr.anurag/', alt: 'Instagram' },
  { key: 'twitter', icon: twitterIcon, url: 'https://twitter.com/anuragsinghbam', alt: 'Twitter' },
  { key: 'github', icon: githubIcon, url: 'https://github.com/anuragsinghbam', alt: 'GitHub' },
];



const MENU_ITEMS = [
  { label: 'HOME', url: '/', icon: 'fa-home' },
  { label: 'ABOUT', url: '/about', icon: 'fa-info-circle' },
  { label: 'EVENTS', url: '/events', icon: 'fa-robot' },
  { label: 'REGISTER', url: '/registration', icon: 'fa-sign-in-alt' },
  { label: 'SCHEDULE', url: '/schedule', icon: 'fa-calendar-alt' },
  { label: 'SPONSORS', url: '/sponsors', icon: 'fa-rocket' },
  { label: 'TEAM', url: '/team', icon: 'fa-users' },
  { label: 'GALLERY', url: '/gallery', icon: 'fa-image' },
  { label: 'CONTACT', url: '/contact', icon: 'fa-envelope' },
];

const Hero = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [iconActive, setIconActive] = useState({});

  const navigate = useNavigate();

  const handleIconClick = (key, url) => {
    setIconActive((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setIconActive((prev) => ({ ...prev, [key]: false }));
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 200);
  };

  const handleAboutOpen = () => setAboutOpen(true);
  const handleAboutClose = () => setAboutOpen(false);
  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  const handleMenuItemClick = (item) => {
    handleMenuClose();
    if (item.url) {
      navigate(item.url);
    }
  };

  // Only render MatterBackground on desktop/tablet (not mobile, not in inspect mode for small screens)
  const [showMatter, setShowMatter] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  // Responsive check for resize/inspect mode
  React.useEffect(() => {
    function handleResize() {
      setShowMatter(window.matchMedia('(min-width: 768px)').matches);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Falling dots animation for mobile glass effect
  React.useEffect(() => {
    if (!showMatter) {
      const canvas = document.getElementById('falling-dots-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = canvas.parentElement.offsetWidth;
      let height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      // More, smaller, brighter dots
      let dots = Array.from({ length: 80 }, () => ({
        x: Math.random() * width,
        y: height + Math.random() * 40, // start at bottom
        r: 0.7 + Math.random() * 1.1, // much smaller
        speed: 0.5 + Math.random() * 1.2,
        alpha: 0.85 + Math.random() * 0.15,
        state: 'falling' // 'falling' or 'waiting'
      }));
      let animationId;
      function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let dot of dots) {
          if (dot.state === 'falling') {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(0,220,255,${dot.alpha})`;
            ctx.shadowColor = 'rgba(0,220,255,0.7)';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
            dot.y -= dot.speed;
            if (dot.y - dot.r <= 0) {
              dot.state = 'waiting';
              dot.waitTime = 0;
            }
          } else if (dot.state === 'waiting') {
            // Stay at top for a short time, then respawn at bottom
            dot.waitTime++;
            if (dot.waitTime > 10 + Math.random() * 20) {
              dot.y = height + dot.r;
              dot.x = Math.random() * width;
              dot.r = 0.7 + Math.random() * 1.1;
              dot.speed = 0.5 + Math.random() * 1.2;
              dot.alpha = 0.85 + Math.random() * 0.15;
              dot.state = 'falling';
            }
          }
        }
        animationId = requestAnimationFrame(animate);
      }
      animate();
      // Responsive resize
      function handleResize() {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
      };
    }
  }, [showMatter]);

  return (
    <div id="body-container">
      <section className="main-section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-section" style={{ position: 'relative', zIndex: 1, overflow: 'hidden', minHeight: '100vh', background: 'none' }}>
          {/* Mobile 3D grid background: only on mobile view, left and right sides as 3D panels */}
          {!showMatter && (
            <>
              <div className="mobile-grid-3d left" aria-hidden="true"></div>
              <div className="mobile-grid-3d right" aria-hidden="true"></div>
              {/* Falling dots animation behind glass effect */}
              <div className="center-falling-dots-bg" aria-hidden="true">
                <canvas id="falling-dots-canvas"></canvas>
              </div>
              {/* Glass effect in center */}
              <div className="center-glass-bg" aria-hidden="true"></div>
            </>
          )}
          {/* Animation absolutely fills hero-section, pointerEvents: none, zIndex: 0 */}
          {showMatter && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
              background: 'transparent',
            }}>
              <MatterBackground />
            </div>
          )}
          <nav className="navbar">
            <div className="logo">
              <a href="/">
                <img src={nameLogoWhite} alt="logo" />
              </a>
            </div>
            <div className="nav-links">
              <div className="phone-icon">
                <a href="https://topmate.io/anuragsingh" target="_blank" rel="noopener noreferrer">
                  <img src={phoneIcon} alt="phone icon" draggable="false" style={{ filter: 'brightness(0) invert(1)', color: '#fff' }} />
                </a>
              </div>
              <div className="whatsapp-icon">
                <a href="https://t.me/procodrr" target="_blank" rel="noopener noreferrer">
                  <img width="24" height="24" src={telegramIcon} alt="telegram icon" draggable="false" style={{ filter: 'brightness(0) invert(1)', color: '#fff' }} />
                </a>
              </div>
            </div>
          </nav>
          <div className="hero-section-text">
            <div className="hero-content" style={{ marginTop: '17rem' }}>
              {/* Only hide event name and subtitle on mobile/small devices */}
              <span className="hide-on-mobile">
                <h1>TRISHNA 2K25</h1>
                <p>NATIONAL LEVEL<br />TECHNICAL SYMPOSIUM</p>
              </span>
              
              <div className="hero-buttons">
                <div className="about-me-btn" onClick={handleAboutOpen}>
                  <span className="about-me-text">About Us</span>
                  <div className="right-arrow"></div>
                </div>
                <div className="about-me-btn" onClick={handleMenuOpen}>
                  <span className="menu-btn-text">Menu</span>
                  <div className="right-arrow"></div>
                </div>
              </div>
               
            </div>
             
            <div className="name-logo" style={{ marginTop: '7rem' }}>
              <span className="mobile-only">
                <img src={nameLogo} alt="name logo" />
              </span>
            </div>
          
          </div>

          {/* Register Now Button - Right Bottom Vertical */}
          {!(aboutOpen || menuOpen) && (
            <div style={{
              position: 'fixed',
              right: '1.2rem',
              bottom: '1.2rem',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}>
              <a
                href="https://forms.gle/your-google-form-link" // <-- Replace with your actual registration link
                target="_blank"
                rel="noopener noreferrer"
                className="about-me-btn"
                style={{
                  pointerEvents: 'all',
                  background: 'linear-gradient(to left, #1595b6, rgba(31, 38, 103, 0.9))',
                  color: '#fff',
                  fontWeight: 800,
                  borderRadius: '5px',
                  padding: '0.3em 0.4em',
                  fontSize: '0.95em',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(21,149,182,0.18)',
                  transition: 'transform 0.1s',
                  cursor: 'pointer',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  marginBottom: '55px',
                  minWidth: 'unset',
                  width: 'auto',
                  marginRight: '0.2rem',
                  letterSpacing: '0.02em',
                }}
              >
                Register Now
              </a>
            </div>
          )}

          {/* About Me Modal */}
          <div style={{
            display: aboutOpen ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.95)',
            zIndex: 1000,
            transition: 'opacity 0.3s',
          }}></div>
          <div className={`about-section${aboutOpen ? ' active' : ''}`} style={{ pointerEvents: aboutOpen ? 'all' : 'none' }}>
            <div className="x-icon" onClick={handleAboutClose}>
              <img src={xIcon} alt="x icon" draggable="false" />
            </div>
            <div className="about-me">
              <div className="about-me-text">
                <h2 className="about-me-title">ABOUT US</h2>
                <p className="about-me-detail">
                 "Trishna is an intercollegiate Technical event being organized by the Department of Electronics and communication". 
                 This time TRISHNA is back with more than a bang for the year 2K24 –
                  with events to excite, Zones to inspire, Live models to educate and shows to enthrall. 
                  With the motto Conceive, Create and Conquer Trishna’25 promises to be the 
                  perfect platform for students from across the country to showcase their talent 
                  and challenge themselves to think beyond the boundaries! To all the Engineers
                   (irrespective of the department),
                  <br></br>
                  <br></br>
                  Welcome! To the seasoned, welcome back, 
                  to this journey of exploration, revelation and awe.
                   Come 18 & 19 OCTOBER 2025, to our college, will be the epicenter of 
                   a scintillating Celebration of Technology, on 18 & 19 OCTOBER

                </p>
                <br></br>
                <ul className="about-me-detail">
                
                 <li>#AITT</li>
                       <li>#IETE</li>
                        <li>#ECE</li>
                         <li>#TRISHNA2K25</li>
                </ul>
              </div>
              
            </div>
            <div className="illustration">
              <div className="coder-img-container">
                <img className="coder-img" src={coderImg} alt="coder image" draggable="false" />
              </div>
            </div>
            
          </div>

          {/* Menu Modal */}
          <div className={`menu-section${menuOpen ? ' active' : ''}`} style={{ 
            pointerEvents: menuOpen ? 'all' : 'none',
            opacity: menuOpen ? 1 : 0,
            visibility: menuOpen ? 'visible' : 'hidden'
          }}>
            <div className="x-icon" onClick={handleMenuClose} style={{ position: 'absolute', top: 20, right: 20, zIndex: 1001 }}>
              <img src={xIcon} alt="x icon" draggable="false" />
            </div>
            <div className="menu-content">
              <div className="menu-text">
                <h2 className="menu-title">NAVIGATION</h2>
                <div className="sci-fi-menu-grid">
                  {MENU_ITEMS.map((item) => (
                    <a 
                      key={item.label} 
                      href={item.url} 
                      className="sci-fi-menu-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuItemClick(item);
                      }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                      <span>{item.label}</span>
                      <div className="sci-fi-btn-glow"></div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="menu-illustration">
                <img className="menu-img" src={menuImage} alt="menu illustration" draggable="false" />
              </div>
            </div>
          </div>

          <ul className="social-links">
            {SOCIAL_ICONS.map((icon) => (
              <li className={`${icon.key}-icon`} key={icon.key} style={{ margin: 0 }}>
                <button
                  onClick={() => handleIconClick(icon.key, icon.url)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  aria-label={icon.alt}
                >
                  <img
                    src={icon.icon}
                    alt={icon.alt}
                    width={28}
                    height={28}
                    style={{
                      filter: 'invert(1)',
                      transition: 'transform 0.2s',
                      transform: iconActive[icon.key] ? 'scale(1.2)' : 'scale(1)',
                    }}
                    className={iconActive[icon.key] ? 'icon-animate' : ''}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        
      </section>
    </div>
    
  );
};

export default Hero;
