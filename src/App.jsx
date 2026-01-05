import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LogoBranding from './pages/Content/LogoBranding';
import HeroSection from './pages/Content/HeroSection';
import Certifications from './pages/Content/Certifications';
import './App.scss';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Content Management Routes */}
            <Route path="content">
              <Route path="logo" element={<LogoBranding />} />
              <Route path="hero" element={<HeroSection />} />
              <Route path="Certifications" element={<Certifications />} />
              <Route path="about" element={<div className="temp-page">About Coach</div>} />
              <Route path="testimonials" element={<div className="temp-page">Testimonials</div>} />
              <Route path="programs" element={<div className="temp-page">Programs Preview</div>} />
              <Route path="footer" element={<div className="temp-page">Footer Content</div>} />
            </Route>
            
            {/* ... باقي الـ Routes */}
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;