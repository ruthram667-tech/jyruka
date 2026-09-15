import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-dark-border bg-white dark:bg-[#070a12] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Jyruka
              </span>
            </Link>

            <p className="text-xs text-slate-500 dark:text-dark-muted max-w-sm leading-relaxed">
              The premier freelance talent marketplace for fast-scaling startups and modern enterprises. Hire verified top 3% software engineers, AI scientists, and designers.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                Subscribe to our Tech Talent Dispatch
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 size={16} />
                  <span>Thanks for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your work email..."
                    className="flex-1 bg-slate-100 dark:bg-dark-surface text-slate-900 dark:text-white border border-slate-200 dark:border-dark-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-3 py-2 text-xs placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Join</span>
                    <Send size={12} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: For Clients */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              For Clients
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/freelancers" className="hover:text-brand-500 transition-colors">
                  Browse Freelancers
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="hover:text-brand-500 transition-colors">
                  Post a Project
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-500 transition-colors">
                  Pricing & Escrow
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-brand-500 transition-colors">
                  Client Protection
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-500 transition-colors">
                  Client Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: For Freelancers */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              For Talent
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/how-it-works" className="hover:text-brand-500 transition-colors">
                  How to Get Vetted
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-brand-500 transition-colors">
                  Explore Categories
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-brand-500 transition-colors">
                  Create Talent Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-500 transition-colors">
                  Freelancer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-500 transition-colors">
                  Fee Structure (5-8%)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Legal */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/about" className="hover:text-brand-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-500 transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-500 transition-colors">
                  Support & Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-500 transition-colors">
                  Trust & Security
                </Link>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">
                  Careers (We're Hiring!)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-dark-muted">
          <div>
            © {new Date().getFullYear()} Jyruka Inc. All rights reserved. Powered by React, Three.js & Tailwind.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
