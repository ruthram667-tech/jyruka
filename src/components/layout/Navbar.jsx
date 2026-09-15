import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Sun,
  Moon,
  PlusCircle,
  Menu,
  X,
  CheckCircle,
  Briefcase,
  User,
  ArrowRight,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import SearchBar from '../ui/SearchBar';

export default function Navbar({ onToggleSidebar, isSidebarCollapsed }) {
  const { theme, toggleTheme } = useTheme();
  const {
    userRole,
    setUserRole,
    notifications,
    unreadNotificationsCount,
    markAllNotificationsRead,
  } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  // Close notifications modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-slate-200/80 dark:border-dark-border bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md transition-colors duration-300">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left: Sidebar Toggle & Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar Navigation"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-dark-muted dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
          >
            <Menu size={20} />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-slate-900 dark:from-white dark:via-brand-300 dark:to-white bg-clip-text text-transparent">
                Jyruka
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-brand-500 -mt-1 hidden sm:block">
                Freelance Cloud
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchBar compact placeholder="Search top developers, designers, AI engineers..." />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Role Toggle Switcher */}
          <button
            onClick={() => setUserRole(userRole === 'client' ? 'freelancer' : 'client')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-dark-border hover:border-brand-500/50 transition-colors"
            title="Click to toggle Client or Freelancer mode"
          >
            {userRole === 'client' ? (
              <>
                <Briefcase size={13} className="text-brand-500" />
                <span>Client Mode</span>
              </>
            ) : (
              <>
                <User size={13} className="text-accent-cyan" />
                <span>Freelancer Mode</span>
              </>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Mode"
            className="p-2 rounded-xl text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              aria-label="Notifications"
              className="p-2 rounded-xl text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors relative"
            >
              <Bell size={18} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              )}
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>

            {/* Notification Flyout */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-dark-border">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Notifications
                    </h4>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                        {unreadNotificationsCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-brand-500 hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 dark:divide-dark-border max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`py-3 flex items-start gap-3 transition-colors ${
                        !n.read ? 'bg-brand-50/40 dark:bg-brand-950/20 px-2 rounded-lg' : ''
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-dark-border text-center">
                  <Link
                    to="/dashboard"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-semibold text-brand-500 hover:text-brand-600 inline-flex items-center gap-1"
                  >
                    View All in Dashboard <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Auth & Post a Job */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/login"
              className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors hidden sm:inline-block"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-200 hover:border-brand-500 hover:text-brand-500 dark:hover:border-brand-400 transition-colors hidden md:inline-block"
            >
              Sign Up
            </Link>

            <Link
              to="/post-job"
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white shadow-md shadow-brand-500/25 hover:shadow-glow-brand transition-all duration-200"
            >
              <PlusCircle size={15} />
              <span className="hidden xs:inline">Post a Job</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
