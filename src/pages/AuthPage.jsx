import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      localStorage.setItem('jyruka_auth', 'true');
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail('admin@jyruka.com');
    setPassword('••••••••••••');
    handleLogin();
  };

  return (
    <PageTransition className="py-16 flex items-center justify-center min-h-[calc(100vh-12rem)] px-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
              Jyruka
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Company Owner Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-dark-muted mt-1.5">
            Internal access to client inquiries, ongoing sprints, and revenue analytics.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-xl">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-3"
              >
                <CheckCircle2 size={40} className="text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Authenticated Successfully
                </h3>
                <p className="text-xs text-slate-400">
                  Opening internal company command center...
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                {/* Demo Credentials Pill */}
                <div className="p-3 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-800/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
                    <Sparkles size={14} />
                    <span className="font-semibold">Quick Review Demo:</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="px-2.5 py-1 rounded-lg bg-brand-500 text-white font-bold text-[11px] hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    1-Click Admin Login
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Authorized Email
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@jyruka.com"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Security Password
                    </label>
                    <span className="text-[11px] text-brand-500 hover:underline cursor-pointer">
                      Reset?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
                  <ArrowRight size={14} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
