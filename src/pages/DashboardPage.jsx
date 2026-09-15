import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  DollarSign,
  Users,
  ShieldCheck,
  PlusCircle,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import TiltCard from '../components/ui/TiltCard';
import { useApp } from '../context/AppContext';
import { FREELANCERS, JOBS } from '../data/mockData';

export default function DashboardPage() {
  const { userRole, setUserRole, setActiveChatId } = useApp();
  const [activeTab, setActiveTab] = useState(userRole || 'client');
  const navigate = useNavigate();

  const handleOpenChat = (chatId) => {
    setActiveChatId(chatId);
    navigate('/messages');
  };

  return (
    <PageTransition className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Workspace Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted mt-1">
            Overview of active projects, milestone payments, and team collaboration.
          </p>
        </div>

        {/* View Switcher: Client vs Freelancer */}
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-2xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border inline-flex items-center">
            <button
              onClick={() => {
                setActiveTab('client');
                setUserRole('client');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'client'
                  ? 'bg-white dark:bg-dark-card text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase size={14} />
              <span>Client View</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('freelancer');
                setUserRole('freelancer');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'freelancer'
                  ? 'bg-white dark:bg-dark-card text-accent-cyan shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users size={14} />
              <span>Freelancer View</span>
            </button>
          </div>

          {activeTab === 'client' && (
            <Link
              to="/post-job"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all"
            >
              <PlusCircle size={15} />
              <span>Post New Job</span>
            </Link>
          )}
        </div>
      </div>

      {/* CLIENT VIEW */}
      {activeTab === 'client' && (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Total Invested</span>
                <DollarSign size={16} className="text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                $34,500
              </div>
              <span className="text-[11px] text-emerald-500 font-medium">
                +$8,500 this month
              </span>
            </TiltCard>

            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Active Hires</span>
                <Users size={16} className="text-brand-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                3
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                2 engineers, 1 designer
              </span>
            </TiltCard>

            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Escrow Protected</span>
                <ShieldCheck size={16} className="text-cyan-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white text-cyan-600 dark:text-cyan-400">
                $12,400
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Held safely across 4 milestones
              </span>
            </TiltCard>

            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Active Openings</span>
                <Briefcase size={16} className="text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                2
              </div>
              <span className="text-[11px] text-brand-500 font-medium">
                22 proposals pending review
              </span>
            </TiltCard>
          </div>

          {/* Active Contractor Engagements */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Active Contracts & Milestones
              </h2>
              <span className="text-xs font-semibold text-slate-400">3 ongoing</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-dark-border">
              {[
                {
                  freelancer: FREELANCERS[0],
                  project: 'Realtime WebSocket Trading Architecture',
                  currentMilestone: 'Milestone 2: Sub-50ms Chart Streaming',
                  amount: '$4,250',
                  status: 'Review Deliverable',
                  progress: 75,
                },
                {
                  freelancer: FREELANCERS[1],
                  project: '3D Spatial Audio Interface Redesign',
                  currentMilestone: 'Milestone 1: Figma Token System & Component Library',
                  amount: '$3,000',
                  status: 'In Progress',
                  progress: 40,
                },
              ].map((c, idx) => (
                <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={c.freelancer.avatar}
                      alt={c.freelancer.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-500/20"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {c.freelancer.name}
                      </div>
                      <div className="text-xs text-brand-500 font-medium">{c.project}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{c.currentMilestone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {c.amount}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold">
                        {c.status}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenChat('chat-1')}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-dark-border hover:bg-slate-100 dark:hover:bg-dark-surface text-slate-600 dark:text-slate-300 transition-colors"
                      title="Open chat"
                    >
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Posted Job Openings */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              My Posted Project Openings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JOBS.slice(0, 2).map((job) => (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-surface/50 border border-slate-200/60 dark:border-dark-border flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-brand-500 tracking-wider">
                      {job.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-2">
                      {job.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-dark-border flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-500">{job.budget}</span>
                    <Link
                      to="/freelancers"
                      className="font-bold text-brand-500 hover:underline flex items-center gap-1"
                    >
                      <span>{job.proposalsCount} Proposals</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FREELANCER VIEW */}
      {activeTab === 'freelancer' && (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Total Earnings</span>
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white text-emerald-600 dark:text-emerald-400">
                $28,450
              </div>
              <span className="text-[11px] text-emerald-500 font-medium">
                +$4,250 pending release
              </span>
            </TiltCard>

            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Active Contracts</span>
                <Briefcase size={16} className="text-brand-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                2
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                All milestones in good standing
              </span>
            </TiltCard>

            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Profile Views</span>
                <Users size={16} className="text-accent-cyan" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                412
              </div>
              <span className="text-[11px] text-accent-cyan font-medium">
                +24% from last week
              </span>
            </TiltCard>

            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Job Success Score</span>
                <ShieldCheck size={16} className="text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white text-amber-500">
                100%
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Top Rated status active
              </span>
            </TiltCard>
          </div>

          {/* Active Client Contracts */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              Active Client Engagements
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-surface/50 border border-slate-200 dark:border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-brand-500">Veloce Capital</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-400">Due in 4 days</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Next.js Enterprise WebSocket Dashboard Migration
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Milestone 2: Complete order book depth charting & push to staging branch
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-base font-bold text-emerald-500">$4,250</div>
                    <span className="text-[10px] text-slate-400">Escrow Funded</span>
                  </div>
                  <button
                    onClick={() => handleOpenChat('chat-1')}
                    className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    Submit Work
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
