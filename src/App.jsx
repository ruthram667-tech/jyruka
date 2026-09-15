import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import BrowseFreelancersPage from './pages/BrowseFreelancersPage';
import FreelancerProfilePage from './pages/FreelancerProfilePage';
import CategoriesPage from './pages/CategoriesPage';
import PostJobPage from './pages/PostJobPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import MessagesPage from './pages/MessagesPage';
import SavedPage from './pages/SavedPage';
import ContactPage from './pages/ContactPage';
import SettingsPage from './pages/SettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const isMessagesPage = location.pathname.startsWith('/messages');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      <ScrollToTop />

      {/* Top Navbar */}
      <Navbar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => {
          if (window.innerWidth < 1024) {
            setMobileSidebarOpen(!mobileSidebarOpen);
          } else {
            setIsSidebarCollapsed(!isSidebarCollapsed);
          }
        }}
      />

      <div className="flex-1 flex relative">
        {/* Collapsible Persistent Left Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area: dynamically shifts margin based on sidebar state */}
        <main
          className={`flex-1 flex flex-col min-w-0 transition-[padding-left] duration-250 ease-in-out ${
            isSidebarCollapsed ? 'lg:pl-[74px]' : 'lg:pl-[240px]'
          }`}
        >
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/freelancers" element={<BrowseFreelancersPage />} />
                <Route path="/freelancer/:id" element={<FreelancerProfilePage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/post-job" element={<PostJobPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/login" element={<AuthPage initialMode="login" />} />
                <Route path="/signup" element={<AuthPage initialMode="signup" />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/saved" element={<SavedPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </div>

          {/* Persistent Footer on all views except full-height messaging */}
          {!isMessagesPage && <Footer />}
        </main>
      </div>
    </div>
  );
}
