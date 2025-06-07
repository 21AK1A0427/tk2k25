// router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/sections/Hero';
import AboutPage from './components/sections/AboutPage';
import Events from './components/sections/Events';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
