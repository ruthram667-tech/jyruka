import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { INQUIRIES } from '../../data/mockData';

const NAV_ITEMS = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Client Inquiries', path: '/dashboard/inquiries', icon: Inbox, badge: INQUIRIES.filter(i => i.status === 'New').length },
  { name: 'Projects', path: '/dashboard/projects', icon: Briefcase },
  { name: 'Team Roster', path: '/dashboard/team', icon: Users },
  { name: 'Reports', path: '/dashboard/reports', icon: BarChart3 },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar({ isCollapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jyruka_auth');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <motion.aside
        animate={{
          width: isCollapsed ? 76 : 250,
        }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-[#090d16] border-r border-slate-200/80 dark:border-dark-border flex flex-col justify-between py-5 select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 lg:transition-none`}
      >
        <div>
          {/* Dashboard Header Logo */}
          <div className="px-5 mb-8 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white shrink-0 shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white truncate">
                    Jyruka
                  </span>
                  <span className="text-[10px] uppercase font-bold text-brand-500 tracking-wider">
                    Internal Portal
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Nav Items */}
          <div className="px-3 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  onClick={onCloseMobile}
                  title={isCollapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-extrabold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-brand-500 rounded-r-full" />
                      )}
                      <div className={`shrink-0 ${isActive ? 'text-brand-500' : 'text-slate-400'}`}>
                        <Icon size={18} />
                      </div>
                      {!isCollapsed && (
                        <span className="truncate flex-1 tracking-tight">
                          {item.name}
                        </span>
                      )}
                      {!isCollapsed && item.badge > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white shrink-0">
                          {item.badge}
                        </span>
                      )}
                      {isCollapsed && item.badge > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer: Collapse Toggle & Logout */}
        <div className="px-3 pt-4 border-t border-slate-100 dark:border-dark-border space-y-2">
          {/* Public site shortcut */}
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-brand-500 transition-colors"
            title="Return to Public Website"
          >
            <ExternalLink size={16} />
            {!isCollapsed && <span>Public Website</span>}
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
            title="Log Out"
          >
            <LogOut size={16} />
            {!isCollapsed && <span>Log Out</span>}
          </button>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-full items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
