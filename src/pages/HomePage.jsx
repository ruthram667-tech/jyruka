import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Zap,
  Star,
  Users,
  Code2,
  BrainCircuit,
  Palette,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import Hero3DScene from '../components/3d/Hero3DScene';
import TiltCard from '../components/ui/TiltCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import PageTransition from '../components/layout/PageTransition';
import {
  SERVICES,
  PORTFOLIO_PROJECTS,
  COMPANY_STATS,
  TESTIMONIALS,
} from '../data/mockData';

export default function HomePage() {
  return (
    <PageTransition>
      {/* 1. Hero Section with Interactive 3D Canvas */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-slate-200/60 dark:border-dark-border">
        {/* Glow ambient background orbs */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 z-10"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800/80 text-brand-600 dark:text-brand-400 text-xs font-extrabold tracking-wide uppercase shadow-sm">
                <Sparkles size={14} className="animate-spin" />
                <span>On-Demand Software & AI Squads</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                We build ambitious digital products with{' '}
                <span className="bg-gradient-to-r from-brand-500 via-indigo-400 to-accent-cyan bg-clip-text text-transparent">
                  top 3% freelance talent.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-dark-muted max-w-xl leading-relaxed">
                Jyruka is a modern freelance services firm. We assemble pre-vetted pods of senior software engineers, AI architects, and UI/UX designers to help venture-backed companies ship faster.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/contact"
                  className="px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:shadow-glow-brand transition-all duration-200 flex items-center gap-2"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  to="/portfolio"
                  className="px-6 py-3.5 rounded-xl bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-dark-surface text-slate-800 dark:text-white font-bold text-xs border border-slate-200 dark:border-dark-border shadow-sm transition-all duration-200"
                >
                  Explore Our Work
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Escrow Milestone Security</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-brand-500" />
                  <span>Pre-Vetted Senior Engineers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={16} className="text-amber-500" />
                  <span>Squad Deployed in &lt; 48h</span>
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
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/75 dark:bg-dark-card/85 backdrop-blur-md border border-white/40 dark:border-white/10 text-xs flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    Interactive Collaboration Mesh
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-dark-muted hidden sm:inline">
                  Move mouse to interact
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Animated Stats Counters */}
      <section className="py-12 bg-white dark:bg-dark-card/40 border-b border-slate-200/60 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {COMPANY_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-1"
              >
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <div className="text-xs text-slate-500 dark:text-dark-muted font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Overview Preview */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
              Capabilities
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Services Tailored for High Velocity
            </h2>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 group"
          >
            <span>View all services & deliverables</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 6).map((service) => (
            <TiltCard
              key={service.id}
              maxTilt={6}
              scale={1.02}
              className="p-7 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-xl dark:hover:shadow-glow-brand/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800">
                    {service.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{service.category}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                <div className="space-y-2 mb-6">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Timeline: {service.typicalTimeline}</span>
                <Link
                  to="/services"
                  className="font-bold text-brand-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  Learn more →
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Jyruka (Trust Points) */}
      <section className="py-16 lg:py-24 bg-slate-100/60 dark:bg-dark-card/30 border-y border-slate-200/60 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
              The Jyruka Difference
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Founders & Tech Leaders Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: '48-Hour Squad Assembly',
                desc: 'Skip 4-month hiring cycles. We match and onboard senior pods ready to push commits within 48 hours.',
              },
              {
                icon: ShieldCheck,
                title: 'Escrow Milestone Guarantee',
                desc: 'Zero risk. Project payments sit securely in escrow and are released only when you inspect and approve deliverables.',
              },
              {
                icon: Users,
                title: 'Top 3% Technical Rigor',
                desc: 'Every specialist is hand-vetted on system design, distributed systems, and real-world code architecture.',
              },
              {
                icon: Sparkles,
                title: '100% IP & Zero Lock-in',
                desc: 'All source code, design systems, and documentation belong to you from day one. Clean handovers with zero friction.',
              },
            ].map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200/60 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Featured Work / Case Studies Preview */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
              Proven Track Record
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 group"
          >
            <span>Explore all case studies</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_PROJECTS.slice(0, 3).map((project) => (
            <TiltCard
              key={project.id}
              maxTilt={6}
              scale={1.02}
              className="rounded-3xl overflow-hidden bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-md text-[11px] font-bold text-brand-600 dark:text-brand-400">
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs text-slate-400 font-semibold mb-1">{project.client}</div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-dark-border text-center">
                    {project.metrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to="/portfolio"
                  className="text-xs font-bold text-brand-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  View Case Study →
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 6. Client Testimonials */}
      <section className="py-16 lg:py-24 bg-white dark:bg-dark-card/40 border-t border-slate-200/60 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
              Testimonials
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trusted by Ambitious Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-3xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm flex flex-col justify-between"
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

      {/* 7. Final High-Impact CTA Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 text-white shadow-2xl border border-brand-700/50">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Have an ambitious project in mind? Let's build it.
            </h2>
            <p className="text-sm sm:text-base text-brand-100 leading-relaxed">
              Schedule a 20-minute discovery session with our principal engineers. We'll map your technical requirements and assemble your custom squad in under 48 hours.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-white text-brand-900 hover:bg-brand-50 font-bold text-xs shadow-lg transition-all"
              >
                Schedule Discovery Call
              </Link>
              <Link
                to="/pricing"
                className="px-6 py-3.5 rounded-xl bg-brand-700/80 hover:bg-brand-700 text-white font-bold text-xs border border-brand-500/50 transition-all"
              >
                View Engagement Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
