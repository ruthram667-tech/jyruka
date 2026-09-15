import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Users,
  Grid,
  HelpCircle,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Bookmark,
  BookOpen,
  Info,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Browse Freelancers', path: '/freelancers', icon: Users },
  { name: 'Categories', path: '/categories', icon: Grid },
  { name: 'How It Works', path: '/how-it-works', icon: HelpCircle },
  { name: 'Pricing', path: '/pricing', icon: CreditCard },
  { name: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Messages', path: '/messages', icon: MessageSquare, badgeKey: 'messages' },
  { name: 'Saved', path: '/saved', icon: Bookmark, badgeKey: 'saved' },
  { name: 'Blog', path: '/blog', icon: BookOpen },
  { name: 'About Us', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Mail },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isCollapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const location = useLocation();
  const { savedFreelancerIds, savedJobIds, chats } = useApp();

  const totalSaved = savedFreelancerIds.length + savedJobIds.length;
  const unreadMessagesCount = chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Persistent Sidebar */}
      <motion.aside
        animate={{
          width: isCollapsed ? 74 : 240,
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`fixed top-16 bottom-0 left-0 z-40 bg-white dark:bg-[#090d16] border-r border-slate-200/80 dark:border-dark-border flex flex-col justify-between py-4 select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 lg:transition-none`}
      >
        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 space-y-1.5 scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                title={isCollapsed ? item.name : undefined}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface'
                }`}
              >
                {/* Active route glowing indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-brand-500 rounded-r-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className={`shrink-0 ${isActive ? 'text-brand-500' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`}>
                  <Icon size={19} />
                </div>

                {!isCollapsed && (
                  <span className="truncate flex-1 tracking-tight">
                    {item.name}
                  </span>
                )}

                {/* Notification Badges */}
                {!isCollapsed && item.badgeKey === 'messages' && unreadMessagesCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500 text-white shrink-0">
                    {unreadMessagesCount}
                  </span>
                )}

                {!isCollapsed && item.badgeKey === 'saved' && totalSaved > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-300 shrink-0">
                    {totalSaved}
                  </span>
                )}

                {/* Collapsed view dot badge */}
                {isCollapsed && item.badgeKey === 'messages' && unreadMessagesCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Collapse Toggle (Desktop only) */}
        <div className="hidden lg:block px-3 pt-3 border-t border-slate-100 dark:border-dark-border">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-dark-muted dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <>
                <ChevronLeft size={18} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
