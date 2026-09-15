import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Users, Briefcase } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import FreelancerCard from '../components/ui/FreelancerCard';
import JobCard from '../components/ui/JobCard';
import { useApp } from '../context/AppContext';
import { FREELANCERS, JOBS } from '../data/mockData';

export default function SavedPage() {
  const { savedFreelancerIds, savedJobIds } = useApp();
  const [activeTab, setActiveTab] = useState('freelancers'); // 'freelancers' | 'jobs'

  const bookmarkedFreelancers = FREELANCERS.filter((f) =>
    savedFreelancerIds.includes(f.id)
  );

  const bookmarkedJobs = JOBS.filter((j) => savedJobIds.includes(j.id));

  return (
    <PageTransition className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">
            Saved & Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted">
            Manage your shortlisted talent and bookmarked opportunities.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 rounded-2xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border inline-flex items-center">
          <button
            onClick={() => setActiveTab('freelancers')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'freelancers'
                ? 'bg-white dark:bg-dark-card text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users size={14} />
            <span>Freelancers ({bookmarkedFreelancers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'jobs'
                ? 'bg-white dark:bg-dark-card text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase size={14} />
            <span>Jobs ({bookmarkedJobs.length})</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'freelancers' && (
        <div>
          {bookmarkedFreelancers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedFreelancers.map((fl) => (
                <FreelancerCard key={fl.id} freelancer={fl} />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border space-y-4">
              <Bookmark size={40} className="mx-auto text-slate-300 dark:text-slate-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No freelancers saved yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-dark-muted max-w-sm mx-auto">
                Browse our directory of verified experts and click the bookmark icon to shortlist talent here.
              </p>
              <Link
                to="/freelancers"
                className="inline-block px-5 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-bold"
              >
                Browse Freelancers
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === 'jobs' && (
        <div>
          {bookmarkedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookmarkedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border space-y-4">
              <Briefcase size={40} className="mx-auto text-slate-300 dark:text-slate-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No projects saved yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-dark-muted max-w-sm mx-auto">
                Bookmark exciting job postings to prepare your proposal later.
              </p>
              <Link
                to="/freelancers"
                className="inline-block px-5 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-bold"
              >
                Explore Projects
              </Link>
            </div>
          )}
        </div>
      )}
    </PageTransition>
  );
}
