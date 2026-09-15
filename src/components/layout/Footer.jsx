import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                Jyruka
              </span>
            </Link>

            <p className="text-xs text-slate-500 dark:text-dark-muted max-w-sm leading-relaxed">
              The premier freelance services firm for visionary startups and enterprises. We assemble dedicated pods of senior engineers, AI scientists, and product designers to ship mission-critical software.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                Subscribe to our Technical Leadership Dispatch
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 size={16} />
                  <span>Subscribed! Check your inbox for our latest frameworks.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your work email..."
                    className="flex-1 bg-slate-100 dark:bg-dark-surface text-slate-900 dark:text-white border border-slate-200 dark:border-dark-border focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Join</span>
                    <Send size={12} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/services" className="hover:text-brand-500 transition-colors">
                  Full-Stack Engineering
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-500 transition-colors">
                  Applied AI & LLMs
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-500 transition-colors">
                  UI/UX & Design Systems
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-500 transition-colors">
                  Cloud Security & DevOps
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-500 transition-colors">
                  Fractional CTO Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Case Studies & Work */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/portfolio" className="hover:text-brand-500 transition-colors">
                  Web3 DEX Terminal (Veloce)
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-brand-500 transition-colors">
                  Legal AI Copilot (LexTech)
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-brand-500 transition-colors">
                  Spatial Audio SaaS (HyperFlow)
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-brand-500 transition-colors">
                  Multi-Region EKS (Nimbus)
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-brand-500 transition-colors">
                  All Case Studies →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/about" className="hover:text-brand-500 transition-colors">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-brand-500 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-500 transition-colors">
                  Packages & Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-500 transition-colors">
                  Company Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-500 transition-colors font-semibold text-brand-500">
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-dark-muted">
          <div>
            © {new Date().getFullYear()} Jyruka Inc. All rights reserved. Transforming how modern companies build software.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Terms of Engagement
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              SOC2 Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
