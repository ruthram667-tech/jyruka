import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Zap,
  TrendingUp,
  Star,
  Search,
} from 'lucide-react';
import Hero3DScene from '../components/3d/Hero3DScene';
import FreelancerCard from '../components/ui/FreelancerCard';
import CategoryCard from '../components/ui/CategoryCard';
import StepCard from '../components/ui/StepCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import PageTransition from '../components/layout/PageTransition';
import {
  CATEGORIES,
  FREELANCERS,
  STATS,
  TESTIMONIALS,
  HOW_IT_WORKS,
} from '../data/mockData';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('client'); // 'client' | 'freelancer'
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/freelancers?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const trendingTags = ['React', 'Next.js', 'PyTorch & LLMs', 'Figma UI/UX', 'Kubernetes'];

  return (
    <PageTransition>
      {/* Hero Section with Interactive 3D Canvas */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-slate-200/60 dark:border-dark-border">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 z-10"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800/80 text-brand-600 dark:text-brand-400 text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles size={14} className="animate-spin" />
                <span>The Top 3% Global Talent Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Hire world-class freelance engineers & designers,{' '}
                <span className="bg-gradient-to-r from-brand-500 via-indigo-400 to-accent-cyan bg-clip-text text-transparent">
                  on demand.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-dark-muted max-w-xl leading-relaxed">
                Jyruka connects high-velocity tech startups with battle-tested senior contractors. Escrow milestone protection, zero hiring friction, and sub-48h matching.
              </p>

              {/* Quick Search in Hero */}
              <form
                onSubmit={handleHeroSearch}
                className="max-w-xl flex items-center p-1.5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xl dark:shadow-glow-brand/10 transition-shadow focus-within:border-brand-500"
              >
                <div className="pl-3.5 text-slate-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Try 'React', 'Staff AI Engineer', 'Figma'..."
                  className="flex-1 px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/30 hover:shadow-glow-brand"
                >
                  Search Talent
                </button>
              </form>

              {/* Trending Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Trending:</span>
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => navigate(`/freelancers?q=${encodeURIComponent(tag)}`)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-dark-surface/80 hover:bg-brand-50 dark:hover:bg-brand-950/60 text-slate-600 dark:text-slate-300 hover:text-brand-500 transition-colors border border-slate-200/60 dark:border-dark-border"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Escrow Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-brand-500" />
                  <span>Vetted Top 3%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={16} className="text-amber-500" />
                  <span>Matched in &lt; 48h</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero 3D Interactive Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 h-[380px] sm:h-[450px] lg:h-[500px] relative rounded-3xl overflow-hidden border border-slate-200/60 dark:border-dark-border/80 bg-gradient-to-br from-slate-100/50 to-white/20 dark:from-dark-card/60 dark:to-dark-surface/30 backdrop-blur-md shadow-2xl"
            >
              <Hero3DScene />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/70 dark:bg-dark-card/80 backdrop-blur-md border border-white/40 dark:border-white/10 text-xs flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-800 dark:text-white">
                    Interactive Connection Neural Mesh
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-dark-muted hidden sm:inline">
                  Hover / Drag to rotate
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Live Stats Bar */}
      <section className="py-12 bg-white dark:bg-dark-card/50 border-b border-slate-200/60 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-1"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <div className="text-xs text-slate-500 dark:text-dark-muted font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
              Talent Disciplines
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore By Category
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 group"
          >
            <span>View all categories</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Freelancers Carousel / Grid */}
      <section className="py-16 lg:py-24 bg-slate-100/50 dark:bg-dark-card/30 border-y border-slate-200/60 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
                Top Rated Talent
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Featured Verified Experts
              </h2>
            </div>
            <Link
              to="/freelancers"
              className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 group"
            >
              <span>Browse all 14,500+ freelancers</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREELANCERS.slice(0, 6).map((fl) => (
              <FreelancerCard key={fl.id} freelancer={fl} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Tabbed: Client / Freelancer) */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
            Seamless Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            How Jyruka Works
          </h2>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
            <button
              onClick={() => setActiveTab('client')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'client'
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              For Clients (Hiring)
            </button>
            <button
              onClick={() => setActiveTab('freelancer')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'freelancer'
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              For Freelancers (Work)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS[activeTab].map((step, idx) => (
            <StepCard key={step.step} step={step} index={idx} />
          ))}
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 lg:py-24 bg-white dark:bg-dark-card/40 border-t border-slate-200/60 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
              Wall of Love
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trusted By Founders & Tech Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-dark-border">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {t.author}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-dark-muted">
                      {t.role}, <strong className="text-slate-700 dark:text-slate-300">{t.company}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final High-Converting CTA Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 text-white shadow-2xl border border-brand-700/50">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to scale your product with top-tier talent?
            </h2>
            <p className="text-sm sm:text-base text-brand-100 leading-relaxed">
              Post your project in under 3 minutes. Zero upfront fees. Review matching proposals from verified specialists today.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/post-job"
                className="px-6 py-3.5 rounded-xl bg-white text-brand-900 hover:bg-brand-50 font-bold text-xs shadow-lg transition-all"
              >
                Post a Job Free
              </Link>
              <Link
                to="/freelancers"
                className="px-6 py-3.5 rounded-xl bg-brand-700/80 hover:bg-brand-700 text-white font-bold text-xs border border-brand-500/50 transition-all"
              >
                Browse Freelancers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
