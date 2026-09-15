import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Public Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Private Dashboard Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      <ScrollToTop />

      {/* Public Navbar (Only visible on public showcase pages) */}
      {!isDashboardRoute && <Navbar />}

      {/* Content Routes */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Marketing Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<AuthPage />} />

            {/* Private Internal Dashboard (Accessible after login) */}
            <Route
              path="/dashboard/*"
              element={
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>

      {/* Public Footer (Only visible on public showcase pages) */}
      {!isDashboardRoute && <Footer />}
    </div>
  );
}
