import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowRight, Lock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full h-20 border-b border-slate-200/80 dark:border-dark-border bg-white/85 dark:bg-[#090d16]/85 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-slate-900 dark:from-white dark:via-brand-300 dark:to-white bg-clip-text text-transparent">
              Jyruka
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-500 -mt-1 hidden sm:block">
              Freelance Cloud
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface'
                }`}
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle, Login, CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light theme"
            className="p-2.5 rounded-xl text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Login Button (Private Owner / Admin Portal) */}
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-dark-border text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-500 transition-colors"
          >
            <Lock size={13} className="text-slate-400" />
            <span>Login</span>
          </Link>

          {/* Get in Touch CTA */}
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:shadow-glow-brand transition-all duration-200"
          >
            <span>Get in Touch</span>
            <ArrowRight size={13} />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-surface"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#090d16] border-b border-slate-200 dark:border-dark-border px-4 py-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-dark-surface hover:text-brand-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 dark:border-dark-border flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
