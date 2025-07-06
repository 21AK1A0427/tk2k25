import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [view, setView] = useState('selection'); // 'selection', 'participantLogin', 'adminLogin'
  const navigate = useNavigate();

  // States for participant login form
  const [participantEmail, setParticipantEmail] = useState('');
  const [participantPassword, setParticipantPassword] = useState('');
  const [rememberParticipant, setRememberParticipant] = useState(false);

  // States for admin login form
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [rememberAdmin, setRememberAdmin] = useState(false);

  const handleParticipantLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual participant login logic
    console.log('Participant Login Attempt:', { participantEmail, participantPassword, rememberParticipant });
    // alert('Participant login submitted (placeholder). Check console.');
    navigate('/user/dashboard'); // Navigate to participant dashboard
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual admin login logic
    console.log('Admin Login Attempt:', { adminId, adminPassword, rememberAdmin });
    // alert('Admin login submitted (placeholder). Check console.');
    navigate('/admin/dashboard'); // Navigate to admin dashboard
  };

  // Sci-fi styled input and button classes
  const sciFiInputClass = "mt-1 block w-full px-4 py-3 bg-transparent border-2 border-cyan-400/50 rounded-md shadow-sm placeholder-cyan-300/70 text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 sm:text-sm tracking-wider font-sci-fi";
  const sciFiButtonClass = "w-full text-black font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,220,255,0.5)] hover:shadow-[0_0_25px_rgba(0,220,255,0.8)] font-sci-fi tracking-wider text-lg";
  const sciFiLabelClass = "block text-sm font-medium text-cyan-300 uppercase tracking-wider font-sci-fi";
  const sciFiCheckboxLabelClass = "ml-2 text-sm text-cyan-300/80 font-sci-fi tracking-wide";
  const sciFiCheckboxClass = "form-checkbox h-4 w-4 text-cyan-500 bg-transparent border-cyan-400/50 rounded focus:ring-cyan-400 focus:ring-offset-0 focus:ring-offset-gray-900";

  // Sci-fi card container style
  const sciFiCardContainer = (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sci-fi">
      {/* Outer frame with corner details - conceptual, adjust with actual SVG/CSS for precise corners */}
      <div className="relative bg-black/70 backdrop-blur-md p-1 rounded-lg shadow-2xl border-2 border-cyan-500/70 w-full max-w-md" 
           style={{boxShadow: '0 0 25px rgba(0, 220, 255, 0.3), 0 0 10px rgba(0,220,255,0.2) inset'}}>
        {/* Top-left corner graphic (example) */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-md"></div>
        {/* Top-right corner graphic (example) */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-md"></div>
        {/* Bottom-left corner graphic (example) */}
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-md"></div>
        {/* Bottom-right corner graphic (example) */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-md"></div>
        
        <div className="p-8">
          {/* Close button - styled to fit sci-fi theme */}
          <button 
            onClick={() => navigate('/')} 
            className="absolute top-3 right-3 text-cyan-300 hover:text-white text-3xl z-10 font-mono"
            aria-label="Close"
          >
            &times;
          </button>

          {view === 'selection' && (
            <>
              <h1 className="text-4xl font-bold mb-10 text-center text-cyan-300 uppercase tracking-widest font-sci-fi">LOGIN AS</h1>
              <div className="space-y-5">
                <button
                  onClick={() => setView('participantLogin')}
                  className={`${sciFiButtonClass} bg-sky-500 hover:bg-sky-400`}
                >
                  Participant
                </button>
                <button
                  onClick={() => setView('adminLogin')}
                  className={`${sciFiButtonClass} bg-pink-500 hover:bg-pink-400`}
                >
                  Admin
                </button>
              </div>
            </>
          )}

          {view === 'participantLogin' && (
            <>
              <button onClick={() => setView('selection')} className="absolute top-5 left-5 text-cyan-400 hover:text-cyan-200 mb-4 text-sm font-sci-fi tracking-wider">
                &larr; BACK
              </button>
              <h2 className="text-3xl font-bold mb-8 text-center text-cyan-300 uppercase tracking-widest pt-8 font-sci-fi">Participant Sign In</h2>
              <form onSubmit={handleParticipantLoginSubmit} className="space-y-6">
                <div>
                  <label htmlFor="participantEmail" className={sciFiLabelClass}>Email Address</label>
                  <input
                    type="email"
                    id="participantEmail"
                    value={participantEmail}
                    onChange={(e) => setParticipantEmail(e.target.value)}
                    required
                    className={sciFiInputClass}
                    placeholder="USER@DOMAIN.COM"
                  />
                </div>
                <div>
                  <label htmlFor="participantPassword" className={sciFiLabelClass}>Password</label>
                  <input
                    type="password"
                    id="participantPassword"
                    value={participantPassword}
                    onChange={(e) => setParticipantPassword(e.target.value)}
                    required
                    className={sciFiInputClass}
                    placeholder="************"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberParticipant"
                    checked={rememberParticipant}
                    onChange={(e) => setRememberParticipant(e.target.checked)}
                    className={sciFiCheckboxClass}
                  />
                  <label htmlFor="rememberParticipant" className={sciFiCheckboxLabelClass}>Remember me</label>
                </div>
                <button
                  type="submit"
                  className={sciFiButtonClass}
                >
                  Sign In
                </button>
              </form>
            </>
          )}

          {view === 'adminLogin' && (
            <>
              <button onClick={() => setView('selection')} className="absolute top-5 left-5 text-pink-400 hover:text-pink-200 mb-4 text-sm font-sci-fi tracking-wider">
                &larr; BACK
              </button>
              <h2 className="text-3xl font-bold mb-8 text-center text-pink-300 uppercase tracking-widest pt-8 font-sci-fi">Admin Sign In</h2>
              <form onSubmit={handleAdminLoginSubmit} className="space-y-6">
                <div>
                  <label htmlFor="adminId" className={sciFiLabelClass}>Admin ID</label>
                  <input
                    type="text"
                    id="adminId"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    required
                    className={`${sciFiInputClass} focus:ring-pink-300 focus:border-pink-300 border-pink-400/50 placeholder-pink-300/70 text-pink-200`}
                    placeholder="ADMIN_ID_007"
                  />
                </div>
                <div>
                  <label htmlFor="adminPassword" className={sciFiLabelClass}>Password</label>
                  <input
                    type="password"
                    id="adminPassword"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className={`${sciFiInputClass} focus:ring-pink-300 focus:border-pink-300 border-pink-400/50 placeholder-pink-300/70 text-pink-200`}
                    placeholder="************"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberAdmin"
                    checked={rememberAdmin}
                    onChange={(e) => setRememberAdmin(e.target.checked)}
                    className={`${sciFiCheckboxClass} text-pink-500 focus:ring-pink-400 border-pink-400/50`}
                  />
                  <label htmlFor="rememberAdmin" className={`${sciFiCheckboxLabelClass} text-pink-300/80`}>Remember me</label>
                </div>
                <button
                  type="submit"
                  className={`${sciFiButtonClass} bg-pink-500 hover:bg-pink-400 shadow-[0_0_15px_rgba(255,0,150,0.5)] hover:shadow-[0_0_25px_rgba(255,0,150,0.8)]`}
                >
                  Sign In
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // This part will now be wrapped by sciFiCardContainer logic if a view is active
  if (view === 'selection' || view === 'participantLogin' || view === 'adminLogin') {
    return sciFiCardContainer;
  }

  return null; // Should ideally not be reached
};

export default LoginPage;
