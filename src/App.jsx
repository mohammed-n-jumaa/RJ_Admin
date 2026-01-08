// App.js - Fixed Routes Configuration
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
            {/* Dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Content Management Routes */}
            <Route path="content/logo" element={<LogoBranding />} />
            <Route path="content/hero" element={<HeroSection />} />
            <Route path="content/certifications" element={<Certifications />} />
            <Route path="content/about" element={<AboutCoach />} />
            <Route path="content/testimonials" element={<Testimonials />} />
            <Route path="content/faq" element={<FAQ />} />
            
            {/* Training Routes */}
            <Route path="training/clients" element={<ClientsList />} />
            <Route path="training/clients/:id" element={<ClientDetails />} />
            
            {/* Chat Routes */}
            <Route path="chat" element={<ChatList />} />
            <Route path="chat/:chatId" element={<ChatRoom />} />
            
            {/* Subscriptions Route - FIXED */}
            <Route path="subscriptions" element={<Subscriptions />} />
            
            {/* Settings Routes */}
            <Route path="profile" element={<Profile />} />
            
            {/* Catch-all redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;