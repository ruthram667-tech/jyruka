import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, Bell, Shield } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import { useTheme } from '../../context/ThemeContext';

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes('/inquiries')) return 'Client Inquiries & Leads';
    if (location.pathname.includes('/projects')) return 'Active Projects & Milestones';
    if (location.pathname.includes('/team')) return 'Team & Talent Roster';
    if (location.pathname.includes('/reports')) return 'Financial Reports & Analytics';
    if (location.pathname.includes('/settings')) return 'Internal Company Settings';
    return 'Company Command Overview';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex font-sans">
      {/* Persistent Collapsible Sidebar */}
      <DashboardSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Internal Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-[padding-left] duration-220 ease-in-out ${
          isCollapsed ? 'lg:pl-[76px]' : 'lg:pl-[250px]'
        }`}
      >
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200/80 dark:border-dark-border bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-dark-border">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 font-bold text-xs flex items-center justify-center ring-2 ring-brand-500/30">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Admin Owner
                </div>
                <div className="text-[10px] text-slate-400">jyruka.com</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
