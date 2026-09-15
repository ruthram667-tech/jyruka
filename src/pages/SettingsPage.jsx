import React, { useState } from 'react';
import { CheckCircle2, Moon, Sun, Bell, Shield, CreditCard, User } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { userRole, setUserRole } = useApp();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [notifications, setNotifications] = useState({
    proposals: true,
    chat: true,
    milestones: true,
    newsletter: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <PageTransition className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          Account Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted">
          Manage your notifications, security, themes, and payout methods.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
          <div className="flex items-center gap-2 mb-4 font-bold text-sm text-slate-900 dark:text-white">
            <User size={18} className="text-brand-500" />
            <span>Profile Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="Alex Rivera"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-slate-800 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="alex@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-slate-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Appearance & Mode Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
          <div className="flex items-center gap-2 mb-4 font-bold text-sm text-slate-900 dark:text-white">
            <Sun size={18} className="text-brand-500" />
            <span>Theme & Interface</span>
          </div>

          <div className="flex items-center justify-between py-2 text-xs">
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Dark Mode Theme
              </div>
              <p className="text-slate-400 text-[11px]">
                Currently set to {theme === 'dark' ? 'Dark Futuristic' : 'Clean Light'} mode
              </p>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-dark-border font-bold text-xs hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              <span>Toggle to {theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
          <div className="flex items-center gap-2 mb-4 font-bold text-sm text-slate-900 dark:text-white">
            <Bell size={18} className="text-brand-500" />
            <span>Email & Push Notifications</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'proposals', label: 'New proposal received on active jobs' },
              { id: 'chat', label: 'Direct message from freelancer or client' },
              { id: 'milestones', label: 'Milestone escrow status updates & release notifications' },
              { id: 'newsletter', label: 'Weekly Jyruka engineering digest & hiring trends' },
            ].map((pref) => (
              <label key={pref.id} className="flex items-center gap-3 cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={notifications[pref.id]}
                  onChange={(e) =>
                    setNotifications({ ...notifications, [pref.id]: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {pref.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Payout & Billing Methods */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
          <div className="flex items-center gap-2 mb-4 font-bold text-sm text-slate-900 dark:text-white">
            <CreditCard size={18} className="text-brand-500" />
            <span>Payment & Payout Configuration</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-200/60 dark:border-dark-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold flex items-center justify-center">
                USDC
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  Stripe & Web3 Fast Escrow
                </div>
                <span className="text-slate-400 text-[11px]">Default settlement method</span>
              </div>
            </div>
            <span className="font-bold text-emerald-500">Connected</span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-4">
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <CheckCircle2 size={16} />
              <span>Preferences saved successfully!</span>
            </span>
          )}
          {!savedSuccess && <div />}

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all"
          >
            Save All Preferences
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
