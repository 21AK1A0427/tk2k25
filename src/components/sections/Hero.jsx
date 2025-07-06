import React, { useState, useEffect, Suspense } from 'react'; // Removed useMemo
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/style.css';
import MatterBackground from '../MatterBackground'; // Import MatterBackground
import BottomNavBar from './BottomNavBar'; // Import the new BottomNavBar component
import Countdown from './Countdown';
import VisitorCounter from './VisitorCounter';
import Playground from '../games/Playground';
import { TracingBeam } from '../TracingBeam'; // Import TracingBeam

// Image imports

import namepic from '../../assets/images/nametk.png';

// Mascot/Logo imports for top-right section
import ieteMascot from '../../assets/images/ietelogo.png';
import eceMascot from '../../assets/images/deptlogo.png';
import aittMascot from '../../assets/images/aittlogo.png';



// import coderImg from '../../assets/images/about tk.png'; // Moved to BottomNavBar

// Social icons
import linkedinIcon from '../../assets/images/linkedin.svg';
import instagramIcon from '../../assets/images/instagram.svg';

//about logins and games
import games from '../../assets/images/gameicon.png';
import loginIcon from '../../assets/images/userbg.png'; 

const SOCIAL_ICONS = [
  { key: 'linkedin', icon: linkedinIcon, url: 'https://www.linkedin.com/in/anurag-singh-web-developer/', alt: 'LinkedIn' },
  { key: 'instagram', icon: instagramIcon, url: 'https://www.instagram.com/procodrr.anurag/', alt: 'Instagram' },
];

const Hero = () => {
  const [iconActive, setIconActive] = useState({});
  const navigate = useNavigate();

  const handleIconClick = (key, url) => {
    setIconActive((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setIconActive((prev) => ({ ...prev, [key]: false }));
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 200);
  };

  // Only render MatterBackground on desktop/tablet (not mobile, not in inspect mode for small screens)
  const [showMatter, setShowMatter] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  // Responsive check for resize/inspect mode
  useEffect(() => {
    function handleResize() {
      setShowMatter(window.matchMedia('(min-width: 768px)').matches);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Falling dots animation for mobile glass effect
  useEffect(() => {
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
    <TracingBeam className="w-full" beamPosition="250px">
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
        {showMatter && <MatterBackground />}

        {/* Canvas for falling dots on mobile (if it exists) */}
        {!showMatter && (
          <canvas 
            id="falling-dots-canvas" 
            className="absolute inset-0 w-full h-full z-0" 
          />
        )}

       

        {/* Visitor Counter - Top Left beside Logo with Reduced Height */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-40" style={{marginLeft: '1rem' }}>
          <VisitorCounter />
        </div>

        {/* Top-right section with logos - Desktop/Tablet only */}
        <div className="absolute top-4 right-5 md:top-9 md:right-6 hidden md:flex items-center gap-2 z-30">
          {/* Three logos with links */}
          <a href="https://aits-tpt.edu.in/" target="_blank" rel="noopener noreferrer" title="AITT College">
            <img src={aittMascot} alt="AITT Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover hover:scale-110 transition-transform duration-200" />
          </a>
          <a href="https://aits-tpt.edu.in/electronics-and-communication-engineering-2/" target="_blank" rel="noopener noreferrer" title="ECE Department">
            <img src={eceMascot} alt="ECE Department Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover hover:scale-110 transition-transform duration-200" />
          </a>
          <a href="https://www.iete.org/" target="_blank" rel="noopener noreferrer" title="IETE">
            <img src={ieteMascot} alt="IETE Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover hover:scale-110 transition-transform duration-200" />
          </a>
        </div>

      
       

        {/* Center-right icons (Social, Login, Games) - Responsive positioning */}
        <div className="absolute right-6 top-6 md:right-7 md:top-1/3 md:transform md:-translate-y-1/2 flex flex-col space-y-3 md:space-y-3 z-40">
          {SOCIAL_ICONS.map(social => (
            <a
              key={social.key}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleIconClick(social.key, social.url)}
              className={`group w-10 h-10 md:w-12 md:h-12 border border-sky-500/30 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-360 ${
                iconActive[social.key] ? 'scale-125 bg-sky-500/70' : ''
              } ${
                social.key === 'linkedin' 
                  ? 'hover:bg-blue-600/80 hover:border-blue-600' 
                  : social.key === 'instagram' 
                  ? 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-pink-500' 
                  : 'hover:bg-sky-500/80 hover:border-sky-500'
              }`}
              title={social.alt}
            >
              <img src={social.icon} alt={social.alt} className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-12" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
          ))}
          <Link // Changed div to Link for navigation
            to="/login" // Navigate to /login page
            className="group w-10 h-10 md:w-12 md:h-12 border border-sky-500/30 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-360 hover:bg-green-600/80 hover:border-green-600"
            title="Login/Register"
          >
            <img src={loginIcon} alt="User Login" className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-12" style={{ filter: 'brightness(0) invert(1)' }} />
          </Link>
          <Link
            to="./Playground" // Assuming /games is the route for games page
            className="group w-10 h-10 md:w-12 md:h-12 border border-sky-500/30 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-360 hover:bg-purple-600/80 hover:border-purple-600"
            title="Games"
          >
            <img src={games} alt="Games" className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-12" style={{ filter: 'brightness(0) invert(1)' }} />
          </Link>
        </div>
        
        {/* Main Hero Content Container - Updated Structure */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 md:p-8 w-full">
        
          {/* Section 2: Logo and Buttons */}
          <div className="hero-logo-and-buttons flex flex-col items-center w-full">
            {/* Logo - Centered, further reduced bottom margin to bring buttons closer */}
            <div className="name-logo flex justify-center">
              <span className="mobile-only">
                <img src={namepic} alt="Trishna 2K25 Logo" className="h-auto max-w-[320px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px]" style={{ marginTop: '16rem' }} />
              </span>

              
              <span className="hide-on-mobile">
                <img src={namepic} alt="Trishna 2K25 Logo" className="h-auto max-w-[1000px] sm:max-w-[1000px] md:max-w-[1000px] lg:max-w-[750px]" style={{ marginTop: '11rem' }} />
              </span>
              

            </div>

            {/* Buttons - In a row, centered below logo */}
            <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 -mt-8" style={{ marginTop: '-2rem' }}>
              <button onClick={() => navigate('/registration')} className="px-6 py-2.5 bg-cyan-400 text-black text-base font-sci-fi font-medium rounded-full shadow-xl transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-75 border-2 border-cyan-400 hover:bg-transparent hover:text-cyan-400 hover:border-cyan-400">
                <span className="menu-btn-text">Register Now</span>
              </button>
            </div>
          </div>
        </div>

        <BottomNavBar />
       
        
        {/* New Section for Countdown and Visitor Counter */}
        <section className="hero-next-section flex flex-col md:flex-row items-center justify-center" style={{ marginTop: '200px' }}>
          {/* Countdown Component */}
          <Countdown />
        </section>
       
      </section>
       
         
        <section className="hero-next-section flex flex-col md:flex-row items-center justify-center" style={{ marginTop: '180px' }}>
        
        </section>
      
    </TracingBeam>
    
  );
};

export default Hero;
