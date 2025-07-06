import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Image imports
import heroImage from '../../assets/images/Poster.png';
import collegeImg from '../../assets/images/AITT MASCOT.jpg';
import departmentImg from '../../assets/images/ECE MASCOT.jpg';
import ieteImg from '../../assets/images/IETE MASCOT.jpg';
import trishnaImg from '../../assets/images/TRISHNA MASCOT.jpg';
import mascotImg from '../../assets/images/describe tk.jpg';

// Styles
import '../../styles/Home.css';
import '../../styles/about.css';

import BottomNavBar from './BottomNavBar'; // Import the new BottomNavBar component

// Animated grid wave component for footer
const FooterWaveGrid = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = 220;
    let t = 0;
    const gridSize = 32;
    const cols = Math.floor(width / gridSize) + 2;
    const rows = Math.floor(height / gridSize) + 2;
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#00eaff';
      ctx.lineWidth = 1.2;
      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        for (let x = 0; x < cols; x++) {
          const px = x * gridSize;
          const py = y * gridSize + Math.sin((x + t) * 0.6 + y * 0.4) * 16 * Math.sin(t * 0.5 + y * 0.2);
          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      for (let x = 0; x < cols; x++) {
        ctx.beginPath();
        for (let y = 0; y < rows; y++) {
          const px = x * gridSize + Math.cos((y + t) * 0.6 + x * 0.4) * 8 * Math.cos(t * 0.5 + x * 0.2);
          const py = y * gridSize;
          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      t += 0.02;
      requestAnimationFrame(draw);
    }
    draw();
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = 220;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="footer-wave-grid" style={{ width: '100%', overflow: 'hidden', background: 'linear-gradient(180deg, #0a1428 60%, #001a2e 100%)' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: 220, display: 'block' }} />
    </div>
  );
};

const AboutPage = () => {
  const [darkMode] = useState(false);
  const sectionRefs = useRef([]);
  const navigate = useNavigate();

  // Parallax and fade-in effect
  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight - 80) {
            ref.classList.add('visible');
          } else {
            ref.classList.remove('visible');
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>  
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-gradient">TRISHNA</span> <span className="year-glitch" data-text="2K25">2K25</span>
            </h1>
            <p className="hero-subtitle">TECHNICAL SYMPOSIUM</p>
            <p className="hero-description">
              Join India's premier technical fest with 20+ events, workshops, and competitions
              showcasing cutting-edge technology and innovation
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/register')} className="btn-primary btn-hover-glow">
                <span>Register Now</span>
                <div className="hover-effect"></div>
              </button>
              <button onClick={() => navigate('/events')} className="btn-secondary btn-hover-border">
                <span>Explore Events</span>
                <div className="hover-effect"></div>
              </button>
            </div>
          </div>
          <div className="hero-image-container">
            <img src={heroImage} alt="TRISHNA Fest" className="hero-image" />
            <div className="hero-image-overlay"></div>
          </div>
        </div>
      </section>

      {/* About Sections - Each as a separate section, alternating layout, with floating image and normal text */}
      <div className="about-gradient-bg">
        <section
          ref={el => sectionRefs.current[0] = el}
          className="about-section"
        >
          <div className="about-section-img">
            <img src={collegeImg} alt="About College" />
          </div>
          <div className="about-section-content">
            <h2>About College</h2>
            <p>
              Annamacharya Institute of Technology & Sciences, Tirupati (AITS-T) was established in the year 2007, with a belief that education can influence and mould young minds. Within a decade, AITS, Tirupati received the prestigious stature of an institution with quality education.
            </p>
            <p>
              It is a sprawling campus of more than 45 acres of land. Attributing to the historical importance, Annamacharya, the beloved disciple of Lord Venkateswara who always cherishes to find his berth at his lotus feet. Symbolically, the institute has been christened the name of Annamacharya and is established at the foot of Seven Hills the abode of lord Venkateswara.
            </p>
            <a href="https://aits-tpt.edu.in/" target="_blank" rel="noopener noreferrer" className="about-detail-vertical-btn">Learn More</a>
          </div>
        </section>
        <section
          ref={el => sectionRefs.current[1] = el}
          className="about-section alt"
        >
          <div className="about-section-img">
            <img src={departmentImg} alt="About Department" />
          </div>
          <div className="about-section-content">
            <h2>About Department</h2>
            <p>
              Electronics and Communication Engineering department is aimed to set a path of success to “Budding Engineers”. The department further endeavors to impart high quality education and produce graduates with a sound knowledge on advanced research in ECE. It includes a team of well qualified, experienced and dedicated faculty members with industrial and research background.
            </p>
            <p>
              It offers undergraduate, postgraduate programmes in various disciplines of Electronics and Communication Engineering. B.Tech ECE Programme was accredited by NBA first time under tier – II in 2016 and further extension of accreditation in granted up to June 2023.
            </p>
            <a href="https://aits-tpt.edu.in/electronics-and-communication-engineering-2/" target="_blank" rel="noopener noreferrer" className="about-detail-vertical-btn">Learn More</a>
          </div>
        </section>
        <section
          ref={el => sectionRefs.current[2] = el}
          className="about-section"
        >
          <div className="about-section-img">
            <img src={ieteImg} alt="About IETE" />
          </div>
          <div className="about-section-content">
            <h2>About IETE</h2>
            <p>
              The Institution of Electronics and Telecommunication Engineers (IETE) is India’s leading recognised professional society devoted to the advancement of Science and Technology of Electronics, Telecommunication & IT. Founded in 1953.
            </p>
            <p>
              The IETE is the National Apex Professional body of Electronics and Telecommunication, Computer Science and IT Professionals. It serves more than 1,25,000 members (including Corporate, Student and ISF members) through various 63 Centres, spread all over India and abroad.
            </p>
            <a href="https://www.iete.org/" target="_blank" rel="noopener noreferrer" className="about-detail-vertical-btn">Learn More</a>
          </div>
        </section>
        <section
          ref={el => sectionRefs.current[3] = el}
          className="about-section alt"
        >
          <div className="about-section-img">
            <img src={trishnaImg} alt="About Trishna 2K25" />
          </div>
          <div className="about-section-content">
            <h2>About Trishna 2K25</h2>
            <p>
              Trishna 2K25, an exciting and vibrant two-day event, is going to host by Department of ECE at Annamacharya Institute of Technology & Sciences (AITS), Tirupati, on 18th and 19th October 2025. The event was meticulously organising to provide a platform for students to demonstrate their technical expertise, creativity, and leadership abilities in a competitive yet friendly environment. The event is going to attract a large number of participants from both the host institution and other colleges, with a total of 18 diverse competitions and spread on two days.
            </p>
          </div>
        </section>
        <section
          ref={el => sectionRefs.current[4] = el}
          className="about-section"
        >
          <div className="about-section-img">
            <img src={mascotImg} alt="Mascot Design" />
          </div>
          <div className="about-section-content">
            <h2>About Mascot Design</h2>
            <p>
              🌟 Meet “TRISHAN” – The Hybrid Spirit of TRISHNA 2K25 🐘🦚🦉🐅🦜
            </p>
            <p>
              TRISHAN, the official mascot of TRISHNA 2K25, is not just a character — it's a symbol of unity, intelligence, creativity, and energy. Crafted as a hybrid of five magnificent creatures, each element reflects the core values and visionary goals of the fest:
            </p>
            <ul style={{marginLeft: '1.2em'}}>
              <li><b>🐘 Elephant</b> – The base of strength, wisdom, and legacy. It reflects the technical foundation, memory, and leadership needed in engineering and innovation.</li>
              <li><b>🦚 Peacock Feathers & Colors</b> – Symbolizing beauty, elegance, and creativity, just like the dazzling ideas that light up tech minds.</li>
              <li><b>🦉 Owl Eyes</b> – Sharp, alert, and wise. They represent deep insight, knowledge, and a hunger for learning — the hallmark of a tech enthusiast.</li>
              <li><b>🐅 Tiger Stripes</b> – Denote courage, confidence, and power — vital for young engineers taking bold leaps into the future.</li>
              <li><b>🦜 Parrot's Wings/Voice</b> – Reflecting vibrant communication, articulation, and a spirit that connects, shares, and collaborates.</li>
            </ul>
          </div>
        </section>
      </div>

      <div style={{ marginTop: '100px' }}>
        
      </div>
      
      <BottomNavBar /> {/* Add the BottomNavBar here */}
    </div>
  );
};

export default AboutPage;
