// App.js - تحديث المسارات
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
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
import Subscriptions from './pages/Users/Subscriptions';
import Payments from './pages/Users/Payments';


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
            <Route path="users">
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="payments" element={<Payments />} />
            </Route>

            {/* Communication Routes */}
            <Route path="communication">
              <Route path="chat" element={<div>محادثة العملاء العامة</div>} />
              <Route path="announcements" element={<div>الإعلانات</div>} />
              <Route path="notifications" element={<div>الإشعارات</div>} />
            </Route>
            
            {/* Users & Payments Routes */}
            <Route path="users">
              <Route path="subscriptions" element={<div>حالة الاشتراكات</div>} />
              <Route path="payments" element={<div>التحويلات البنكية</div>} />
            </Route>
            
            {/* Reports Routes */}
            <Route path="reports">
              <Route path="progress" element={<div>تقدم العملاء</div>} />
              <Route path="charts" element={<div>الرسوم البيانية</div>} />
              <Route path="checkins" element={<div>تسجيلات الحضور</div>} />
            </Route>
            
            {/* Settings Routes */}
            <Route path="settings">
              <Route path="profile" element={<div>الملف الشخصي</div>} />
              <Route path="security" element={<div>الأمان</div>} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;