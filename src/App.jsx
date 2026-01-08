// App.js - تحديث المسارات
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import LogoBranding from './pages/Content/LogoBranding';
import HeroSection from './pages/Content/HeroSection';
import Certifications from './pages/Content/Certifications';
import AboutCoach from './pages/Content/AboutCoach';
import Testimonials from './pages/Content/Testimonials';
import FAQ from './pages/Content/FAQ';
import ClientsList from './pages/Training/ClientsList/ClientsList';
import ClientDetails from './pages/Training/ClientDetails/ClientDetails';
// Add Chat imports
import ChatList from './pages/Chat/ChatList/ChatList';
import ChatRoom from './pages/Chat/ChatRoom/ChatRoom';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import Profile from './pages/Profile/Profile';


import './App.scss';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />


            {/* Content Management Routes */}
            <Route path="content">
              <Route path="logo" element={<LogoBranding />} />
              <Route path="hero" element={<HeroSection />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="AboutCoach" element={<AboutCoach />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="faq" element={<FAQ />} />
            </Route>

            {/* Training Routes */}
            <Route path="training">
              <Route path="clients" element={<ClientsList />} />
              <Route path="client/:clientId" element={<ClientDetails />} />
              {/* Add Chat Routes */}
              <Route path="chat" element={<ChatList />} />
              <Route path="chat/:clientId" element={<ChatRoom />} />
            </Route>

            {/* Users & Subscriptions Routes */}
            <Route path="Subscriptions">
              <Route path="subscriptions" element={<Subscriptions />} />
            </Route>



            {/* Settings Routes */}
            <Route path="settings">
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;