import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Briefcase,
  Inbox,
  Users,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import TiltCard from '../components/ui/TiltCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import {
  INQUIRIES as INITIAL_INQUIRIES,
  INTERNAL_PROJECTS,
  ROSTER_MEMBERS,
} from '../data/mockData';

export default function DashboardPage() {
  const location = useLocation();
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [inquiryFilter, setInquiryFilter] = useState('All');

  // Determine current active section from URL path
  let activeSection = 'overview';
  if (location.pathname.includes('/inquiries')) activeSection = 'inquiries';
  else if (location.pathname.includes('/projects')) activeSection = 'projects';
  else if (location.pathname.includes('/team')) activeSection = 'team';
  else if (location.pathname.includes('/reports')) activeSection = 'reports';
  else if (location.pathname.includes('/settings')) activeSection = 'settings';

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  const filteredInquiries =
    inquiryFilter === 'All'
      ? inquiries
      : inquiries.filter((inq) => inq.status === inquiryFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. OVERVIEW VIEW */}
      {activeSection === 'overview' && (
        <div className="space-y-8">
          {/* Top Metric Cards with Animated Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Annual Revenue Run Rate</span>
                <DollarSign size={16} className="text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                <AnimatedCounter target={342800} prefix="$" />
              </div>
              <div className="text-[11px] text-emerald-500 font-bold mt-1">
                +28.4% vs last quarter
              </div>
            </TiltCard>

            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Active Client Sprints</span>
                <Briefcase size={16} className="text-brand-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                <AnimatedCounter target={4} />
              </div>
              <div className="text-[11px] text-brand-500 font-bold mt-1">
                All milestones in good standing
              </div>
            </TiltCard>

            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>New Inbound Inquiries</span>
                <Inbox size={16} className="text-accent-cyan" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white text-accent-cyan">
                <AnimatedCounter target={inquiries.length} />
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">
                {inquiries.filter((i) => i.status === 'New').length} uncontacted leads
              </div>
            </TiltCard>

            <TiltCard className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-dark-muted mb-2 flex items-center justify-between">
                <span>Active Specialist Roster</span>
                <Users size={16} className="text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                <AnimatedCounter target={45} suffix=" Experts" />
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">
                Top 3% vetted talent
              </div>
            </TiltCard>
          </div>

          {/* Recent Inbound Inquiries Pipeline */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Recent Prospective Client Inquiries
                </h2>
                <p className="text-xs text-slate-400">
                  Leads submitted through public contact forms and direct channels.
                </p>
              </div>
              <Link
                to="/dashboard/inquiries"
                className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1"
              >
                <span>View Full Pipeline</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-dark-border text-slate-400">
                    <th className="pb-3 font-semibold">Client / Company</th>
                    <th className="pb-3 font-semibold">Service Requested</th>
                    <th className="pb-3 font-semibold">Budget Range</th>
                    <th className="pb-3 font-semibold">Received</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
                  {inquiries.slice(0, 3).map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50 dark:hover:bg-dark-surface/40">
                      <td className="py-4 pr-3">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {inq.clientName}
                        </div>
                        <div className="text-[11px] text-slate-400">{inq.company}</div>
                      </td>
                      <td className="py-4 pr-3 text-slate-700 dark:text-slate-300 font-medium">
                        {inq.serviceRequested}
                      </td>
                      <td className="py-4 pr-3 font-bold text-emerald-500">
                        {inq.budget}
                      </td>
                      <td className="py-4 pr-3 text-slate-400">{inq.date}</td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            inq.status === 'New'
                              ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                              : inq.status === 'Contacted'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                              : inq.status === 'Proposal Sent'
                              ? 'bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Projects Status */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Active Client Engagements & Deliverables
              </h2>
              <Link
                to="/dashboard/projects"
                className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1"
              >
                <span>View all projects</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTERNAL_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-surface/50 border border-slate-200/60 dark:border-dark-border flex flex-col justify-between"
                >
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-brand-500">{proj.client}</span>
                      <span className="text-slate-400 font-medium">Due: {proj.deadline}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {proj.name}
                    </h3>
                    <div className="text-[11px] text-slate-400 mt-1">Lead: {proj.lead}</div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                      <span>Milestone Progress</span>
                      <span>{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-dark-surface h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. INQUIRIES VIEW */}
      {activeSection === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Client Inquiries & Lead Pipeline
              </h2>
              <p className="text-xs text-slate-400">
                Manage inbound client scopes, respond to proposals, and track conversion status.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['All', 'New', 'Contacted', 'Proposal Sent', 'Won'].map((f) => (
                <button
                  key={f}
                  onClick={() => setInquiryFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    inquiryFilter === f
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-dark-border text-slate-400">
                  <th className="pb-3 font-semibold">Client Name</th>
                  <th className="pb-3 font-semibold">Company & Email</th>
                  <th className="pb-3 font-semibold">Service</th>
                  <th className="pb-3 font-semibold">Budget</th>
                  <th className="pb-3 font-semibold">Scope Message</th>
                  <th className="pb-3 font-semibold">Action Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/50 dark:hover:bg-dark-surface/40">
                    <td className="py-4 pr-3 font-bold text-slate-900 dark:text-white">
                      {inq.clientName}
                    </td>
                    <td className="py-4 pr-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {inq.company}
                      </div>
                      <div className="text-[11px] text-slate-400">{inq.email}</div>
                    </td>
                    <td className="py-4 pr-3 font-medium text-slate-700 dark:text-slate-300">
                      {inq.serviceRequested}
                    </td>
                    <td className="py-4 pr-3 font-bold text-emerald-500">
                      {inq.budget}
                    </td>
                    <td className="py-4 pr-3 max-w-xs truncate text-slate-500" title={inq.message}>
                      {inq.message}
                    </td>
                    <td className="py-4">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border focus:outline-none cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Won">Won</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PROJECTS VIEW */}
      {activeSection === 'projects' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Current Client Engagements & Milestones
            </h2>
            <p className="text-xs text-slate-400">
              Real-time progress on active software and design contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INTERNAL_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-brand-500">{proj.client}</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {proj.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                    {proj.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Budget:</span>{' '}
                    <strong className="text-emerald-500">{proj.budget}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Deadline:</span>{' '}
                    <strong className="text-slate-700 dark:text-slate-200">{proj.deadline}</strong>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span>Sprint Milestone Progress</span>
                    <span>{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-dark-surface h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-600 to-accent-cyan rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TEAM ROSTER VIEW */}
      {activeSection === 'team' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Vetted Specialist Roster
            </h2>
            <p className="text-xs text-slate-400">
              Active freelance engineers and designers deployed across company projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROSTER_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-500/20"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {member.name}
                      </h3>
                      <div className="text-[11px] text-slate-400">{member.location}</div>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-2">
                    {member.role}
                  </p>

                  <div className="text-xs text-slate-500 mb-4">
                    Current Assignment:{' '}
                    <strong className="text-slate-800 dark:text-slate-200 block mt-0.5">
                      {member.currentProject}
                    </strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-xs">
                  <span className="font-black text-slate-900 dark:text-white">
                    {member.hourlyRate}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      member.status === 'Assigned'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                        : 'bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. REPORTS VIEW */}
      {activeSection === 'reports' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Revenue & Performance Analytics
            </h2>
            <p className="text-xs text-slate-400">
              Overview of financial health, client satisfaction, and squad delivery times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase">Average Project Value</div>
              <div className="text-3xl font-black text-emerald-500">$24,600</div>
              <p className="text-xs text-slate-500">Across 140 delivered sprint contracts.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase">Client Retention Rate</div>
              <div className="text-3xl font-black text-brand-500">84.2%</div>
              <p className="text-xs text-slate-500">Clients commissioning follow-up sprints.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase">On-Time Sprint Delivery</div>
              <div className="text-3xl font-black text-cyan-500">98.8%</div>
              <p className="text-xs text-slate-500">Milestones submitted ahead or on deadline.</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. SETTINGS VIEW */}
      {activeSection === 'settings' && (
        <div className="max-w-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Company Portal Settings
            </h2>
            <p className="text-xs text-slate-400">
              Configure notifications, admin accounts, and escrow parameters.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                defaultValue="Jyruka Inc."
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Notification Email
              </label>
              <input
                type="email"
                defaultValue="admin@jyruka.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-sm"
              >
                Save Internal Configurations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
