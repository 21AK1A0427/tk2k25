import React, { useState } from 'react';
import '../../styles/login.css';

const AdminLoginFlow = ({ onSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate admin login success
    if (!email || !password) {
      setError('Email and password required');
      return;
    }
    setError('');
    onSuccess();
  };

  return (
    <div className="login-bg login-bg-sci-fi" style={{ zIndex: 4000 }}>
      <div className="login-panel-sci-fi sci-fi-corners" style={{ minWidth: 340, minHeight: 220, padding: '2.2rem 2vw', position: 'relative' }}>
        <div className="login-panel-header">
          <span style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1.3rem' }}>ADMIN SIGN IN</span>
          <button className="login-panel-close" tabIndex={-1} aria-label="Close" onClick={onClose} style={{ color: '#00eaff', fontSize: '1.5rem', lineHeight: '1rem', padding: 0, position: 'absolute', top: 18, right: 18 }}>×</button>
        </div>
        <form className="login-panel-form" onSubmit={handleSubmit}>
          <label className="login-panel-label" htmlFor="admin-email">EMAIL</label>
          <input
            id="admin-email"
            className="login-panel-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <label className="login-panel-label" htmlFor="admin-pass">PASSWORD</label>
          <input
            id="admin-pass"
            className="login-panel-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <div style={{ color: '#ff5553', marginBottom: 8 }}>{error}</div>}
          <button type="submit" className="login-panel-btn login-panel-btn-dark">LOGIN</button>
        </form>
        <div className="sci-fi-corner sci-fi-corner-tl"></div>
        <div className="sci-fi-corner sci-fi-corner-tr"></div>
        <div className="sci-fi-corner sci-fi-corner-bl"></div>
        <div className="sci-fi-corner sci-fi-corner-br"></div>
      </div>
    </div>
  );
};

export default AdminLoginFlow;
