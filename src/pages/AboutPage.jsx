import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Heart, Award, Globe, Users } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import TiltCard from '../components/ui/TiltCard';
import { TEAM_MEMBERS } from '../data/mockData';

const VALUES = [
  {
    icon: Target,
    title: 'Top 3% Craftsmanship',
    description: 'We reject 96% of applicant profiles to ensure clients collaborate solely with verified, senior domain experts.',
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromising Trust',
    description: 'Our neutral escrow milestone mechanism ensures talent gets paid promptly and clients only pay for deliverables that pass inspection.',
  },
  {
    icon: Globe,
    title: 'Borderless Opportunity',
    description: 'Brilliance has no geography. We connect ambitious tech founders in San Francisco, London, and Tokyo with the best minds on Earth.',
  },
  {
    icon: Heart,
    title: 'Creator Dignity',
    description: 'No race-to-the-bottom hourly bidding wars. We advocate for fair market compensation reflecting real technical depth.',
  },
];

export default function AboutPage() {
  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500">
          Our Purpose
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Pioneering the Next Era of Independent Work
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-dark-muted leading-relaxed">
          Jyruka was founded on a simple conviction: the world’s most impactful software and digital products shouldn’t be bottlenecked by traditional, rigid 6-month corporate hiring cycles.
        </p>
      </div>

      {/* Origin Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Built by engineers who were tired of broken platforms
          </h2>
          <p>
            In 2024, our founders noticed that existing freelance platforms had devolved into spam-filled races to the bottom. Clients spent days sifting through hundreds of low-quality copy-pasted bids, while truly exceptional developers and designers abandoned the platforms in frustration.
          </p>
          <p>
            We built Jyruka as a curated, high-signal network. Every freelancer is evaluated on real-world code reviews, system architecture design, and verified past client deliverables. Today, over $40M in contracts has been completed through our escrow architecture.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-dark-border">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
            alt="Jyruka Team Collaborating"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="mb-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            The Principles That Guide Us
          </h2>
          <p className="text-xs text-slate-500">
            How we make decisions every day for our clients and creators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <TiltCard
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
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

      {/* Animated Team Grid */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
            Leadership
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Meet the Jyruka Core Team
          </h2>
          <p className="text-xs text-slate-500">
            Engineers, designers, and community builders from Figma, Stripe, and DeepMind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <TiltCard
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm text-center flex flex-col items-center group"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-brand-500/20 group-hover:ring-brand-500 transition-all"
              />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {member.name}
              </h3>
              <div className="text-xs font-semibold text-brand-500 mb-2">
                {member.role}
              </div>
              <p className="text-xs text-slate-500 dark:text-dark-muted leading-relaxed">
                {member.bio}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
