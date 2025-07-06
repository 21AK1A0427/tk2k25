// router.jsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/sections/Hero';
import AboutPage from './components/sections/AboutPage';
import Events from './components/sections/Events';
import LoginPage from './components/sections/Login'; // Changed import from Login to LoginPage
import Dashboard from './components/user/Dashboard';
import AdminDashboard from './components/user/AdminDashboard';
import Playground from './components/games/Playground'; // Import Playground component

const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/login" element={<LoginPage />} /> // Changed component from Login to LoginPage
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboardWrapper />} />
      <Route path="/playground" element={<Playground />} /> // Added route for Playground page
    </Routes>
  </HashRouter>
);

// Wrapper to pass state from navigation to AdminDashboard
function AdminDashboardWrapper() {
  // Just render AdminDashboard, do not require navigation state
  return <AdminDashboard />;
}

export default Router;
