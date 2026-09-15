import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Heart, Award, Globe, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import TiltCard from '../components/ui/TiltCard';
import { TEAM_MEMBERS } from '../data/mockData';

const VALUES = [
  {
    icon: Target,
    title: 'Top 3% Technical Rigor',
    description: 'We reject 96% of applicant specialists to ensure our client squads consist strictly of principal-grade engineers and designers.',
  },
  {
    icon: ShieldCheck,
    title: 'Milestone Escrow Trust',
    description: 'Zero financial risk. Funds are deposited in escrow and only disbursed when deliverables pass your inspection.',
  },
  {
    icon: Globe,
    title: 'Borderless Engineering',
    description: 'Brilliance has no geography. We assemble high-impact talent across San Francisco, London, Berlin, and Tokyo.',
  },
  {
    icon: Heart,
    title: 'Long-Term Partnership',
    description: 'We do not engage in churn-and-burn staffing. We act as your high-velocity technical co-founder on every sprint.',
  },
];

export default function AboutPage() {
  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500">
          Our Story & Vision
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Pioneering the Future of Software Development
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-dark-muted leading-relaxed">
          Jyruka was founded on a simple conviction: the world’s most ambitious digital products shouldn’t be bottlenecked by traditional, rigid 6-month corporate hiring cycles.
        </p>
      </div>

      {/* Origin Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Born from frustration with traditional agency models
          </h2>
          <p>
            In 2024, our founders noticed that software companies faced two broken extremes: bloated agencies charging $300/hr for junior developers, or low-cost freelance marketplaces plagued by spam bids and missing deadlines.
          </p>
          <p>
            We built Jyruka as an elite, high-velocity services firm. We assemble hand-picked pods of proven specialists who have built products for Stripe, Figma, and DeepMind. Each squad operates directly inside your Slack and GitHub.
          </p>
          <p>
            Today, over 140 venture-backed products and enterprise systems have launched through Jyruka’s milestone-driven architecture.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-dark-border">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
            alt="Jyruka Core Squad"
            className="w-full h-80 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white text-xs font-semibold">
            Jyruka Engineering & Design Retreat
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            The Values That Drive Us
          </h2>
          <p className="text-xs text-slate-500">
            Guiding principles on every single commit, sprint, and client interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <TiltCard
                key={idx}
                maxTilt={6}
                scale={1.02}
                className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Leadership & Core Team */}
      <div className="mb-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
            Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Meet the Core Leadership
          </h2>
          <p className="text-xs text-slate-500">
            Specialists with executive backgrounds from leading Silicon Valley and global scaleups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <TiltCard
              key={idx}
              maxTilt={6}
              scale={1.02}
              className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm text-center flex flex-col items-center group relative overflow-hidden"
            >
              <div className="relative mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-brand-500/20 group-hover:ring-brand-500 transition-all duration-300"
                />
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {member.name}
              </h3>
              <div className="text-xs font-semibold text-brand-500 mb-3">
                {member.role}
              </div>
              <p className="text-xs text-slate-500 dark:text-dark-muted leading-relaxed">
                {member.bio}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-8">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all"
        >
          <span>Work with our team</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </PageTransition>
  );
}
