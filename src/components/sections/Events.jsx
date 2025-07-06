// src/components/sections/Events.jsx
import { useInView } from 'react-intersection-observer';
// import { motion } from 'framer-motion'; // Removed as it's unused
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Removed useNavigate as it's unused
import tkLogo from '../../assets/images/tk logo.png';
import eventpic from '../../assets/images/event tk.png';
import samplePdf from '../../assets/images/21AK1A0427 APSCHE.pdf';
import imgProjectExpo from '../../assets/images/12979916_5079835.jpg';
import imgWebDesign from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import imgHackathon from '../../assets/images/Codeathon 2k25 Invitation.jpg';
import imgNextCode from '../../assets/images/a346fb78-710f-4faa-b5b1-a87812e13510.jpg';
import imgRubeCube from '../../assets/images/b2197fe3-2e15-4972-bf28-535707b75093.jpeg';
import imgPosterDesign from '../../assets/images/Codeathon 2k25 Invitation.jpg';
import imgCookWithoutFood from '../../assets/images/Download Grunge party crowd background for free.jpeg';
import imgRoboRace from '../../assets/images/GUNJACK VR UI, Haoliang Yang.jpg';
import imgOverDrive from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import imgFullStack from '../../assets/images/_Achievement Certificate.png';
import imgGenAI from '../../assets/images/a346fb78-710f-4faa-b5b1-a87812e13510.jpg';
import imgGittGithub from '../../assets/images/b2197fe3-2e15-4972-bf28-535707b75093.jpeg';
import imgIOT from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import '../../styles/Home.css';
import BottomNavBar from './BottomNavBar'; // Import the new BottomNavBar component

const Events = () => {
  // const navigate = useNavigate(); // Removed as it's unused
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [category, setCategory] = useState('');
  const categories = [
    { key: 'technical', label: 'Technical' },
    { key: 'nontechnical', label: 'Non Technical' },
    { key: 'robotics', label: 'Robotics' },
    { key: 'workshops', label: 'Workshops' },
    { key: 'guest', label: 'Guest Lectures' },
  ];

  const sciFiBtnStyle = {
    fontFamily: 'Orbitron, monospace',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#00eaff',
    background: 'rgba(0,0,0,0.18)',
    border: '2px solid #00eaff55',
    borderRadius: 8,
    padding: '0.7em 0',
    textAlign: 'center',
    letterSpacing: 2,
    boxShadow: '0 0 4px #00eaff22',
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s, border 0.2s',
    position: 'relative',
    overflow: 'hidden',
    outline: 'none',
    margin: 0,
    minWidth: 160,
    minHeight: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <section id="events" ref={ref} style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      margin: 0,
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}>
      {/* Blue grid overlay */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundImage: `repeating-linear-gradient(90deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px)`,
        backgroundSize: '80px 80px',
        backgroundPosition: 'center',
      }} />
      <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {/* TK Logo top left */}
        <img src={tkLogo} alt="TK Logo" style={{ position: 'absolute', top: 18, left: 18, width: 54, height: 54, zIndex: 101 }} />
        {/* Theme pic bottom left */}
        { !category && (
          <img src={eventpic} alt="Theme Pic" style={{ position: 'absolute', left: 18, bottom: 18, width: 320, height: 'auto', zIndex: 101, opacity: 0.95 }} />
        )}
        {/* Category selection buttons */}
        {!category && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', marginTop: '5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`category-filter-btn ${category === cat.key ? 'active-category' : ''}`}
                style={{
                  ...sciFiBtnStyle,
                  minWidth: 140,
                  minHeight: 44,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  marginBottom: 0,
                  background: category === cat.key ? 'rgba(0,234,255,0.18)' : sciFiBtnStyle.background,
                  color: category === cat.key ? '#00eaff' : sciFiBtnStyle.color,
                  border: category === cat.key ? '2px solid #00eaff' : sciFiBtnStyle.border,
                  boxShadow: category === cat.key ? '0 0 12px #00eaff66' : sciFiBtnStyle.boxShadow,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
        {/* Show project cards only after category is selected */}
        {category && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', marginTop: '5rem' }}>
              <button
                onClick={() => setCategory('')}
                style={{ ...sciFiBtnStyle, minWidth: 100, minHeight: 36, fontSize: '1rem', background: 'rgba(0,0,0,0.18)', color: '#00eaff', border: '2px solid #00eaff55', marginBottom: 0, marginRight: 8, cursor: 'pointer' }}
              >
                Back
              </button>
              <span style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1.1rem', marginLeft: 8, alignSelf: 'center' }}>{categories.find(c => c.key === category)?.label}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents(category).map((event, index) => (
                <div // Changed from motion.div as motion import was removed
                  key={event.id}
                  // initial={{ opacity: 0, y: 20 }} // Animation props removed
                  // animate={inView ? { opacity: 1, y: 0 } : {}} // Animation props removed
                  // transition={{ duration: 0.5, delay: index * 0.1 }} // Animation props removed
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out', transitionDelay: `${index * 0.1}s` }} // Basic fade-in-up with inView
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">Event Image</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags && event.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: 12 }}>
                      <a href={event.pdf} target="_blank" rel="noopener noreferrer" style={{
                        ...sciFiBtnStyle,
                        minWidth: 90,
                        minHeight: 32,
                        fontSize: '0.95rem',
                        background: 'linear-gradient(90deg, #00eaff 0%, #0057ff 100%)',
                        color: '#fff',
                        border: 'none',
                        boxShadow: 'none',
                        textDecoration: 'none',
                        padding: '0.25em 0',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>Details</a>
                      <Link to="/register" style={{
                        ...sciFiBtnStyle,
                        minWidth: 90,
                        minHeight: 32,
                        fontSize: '0.95rem',
                        background: 'linear-gradient(90deg, #00ffb8 0%, #00c853 100%)',
                        color: '#fff',
                        border: 'none',
                        boxShadow: 'none',
                        textDecoration: 'none',
                        padding: '0.25em 0',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>Registration</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <BottomNavBar />
    </section>
  );
};

// Helper for filtered events
function filteredEvents(category) {
  const allEvents = {
    technical: [
      { id: 'project-expo', title: 'Project Expo', description: 'Showcase your innovative projects and compete with the best minds.', tags: ['Team', 'Engineering'], image: imgProjectExpo, pdf: samplePdf },
      { id: 'web-design', title: 'Web Design', description: 'Design and build creative websites in a time-bound challenge.', tags: ['Solo', 'UI/UX'], image: imgWebDesign, pdf: samplePdf },
      { id: 'hackathon', title: 'Hackathon', description: 'Solve real-world problems in a 24-hour coding marathon.', tags: ['Team', 'Coding'], image: imgHackathon, pdf: samplePdf },
      { id: 'nextcode', title: 'NextCode', description: 'Compete in advanced coding rounds to prove your programming skills.', tags: ['Solo', 'Coding'], image: imgNextCode, pdf: samplePdf },
    ],
    nontechnical: [
      { id: 'rube-cube', title: 'Rube a Cube', description: 'Solve fun and tricky puzzles in a race against time.', tags: ['Fun', 'Puzzle'], image: imgRubeCube, pdf: samplePdf },
      { id: 'poster-design', title: 'Poster Design', description: 'Show your creativity by designing eye-catching posters.', tags: ['Art', 'Design'], image: imgPosterDesign, pdf: samplePdf },
      { id: 'cook-without-food', title: 'Cook Without Food', description: 'A unique event to test your creativity in the kitchen—without food!', tags: ['Fun', 'Creativity'], image: imgCookWithoutFood, pdf: samplePdf },
    ],
    robotics: [
      { id: 'robo-race', title: 'Robo Race', description: 'Build and race your robots on challenging tracks.', tags: ['Robotics', 'Race'], image: imgRoboRace, pdf: samplePdf },
      { id: 'over-drive', title: 'Over Drive', description: 'Push your robots to the limit in this high-speed event.', tags: ['Robotics', 'Speed'], image: imgOverDrive, pdf: samplePdf },
    ],
    workshops: [
      { id: 'full-stack', title: 'Full Stack', description: 'Hands-on workshop on full stack web development.', tags: ['Workshop', 'Web'], image: imgFullStack, pdf: samplePdf },
      { id: 'gen-ai', title: 'Gen AI', description: 'Explore the latest in Generative AI with practical sessions.', tags: ['Workshop', 'AI'], image: imgGenAI, pdf: samplePdf },
    ],
    guest: [
      { id: 'gitt-github', title: 'Gitt & Github', description: 'Learn version control and collaboration with Git & GitHub.', tags: ['Guest', 'Git'], image: imgGittGithub, pdf: samplePdf },
      { id: 'iot', title: 'IOT', description: 'Discover the world of Internet of Things from industry experts.', tags: ['Guest', 'IoT'], image: imgIOT, pdf: samplePdf },
    ],
  };
  return allEvents[category] || [];
}

export default Events;