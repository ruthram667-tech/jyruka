import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  MapPin,
  Clock,
  Zap,
  Globe,
  MessageSquare,
  Bookmark,
  Share2,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import RatingStars from '../components/ui/RatingStars';
import FreelancerCard from '../components/ui/FreelancerCard';
import { FREELANCERS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function FreelancerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedFreelancerIds, toggleSaveFreelancer, setActiveChatId } = useApp();

  const freelancer = FREELANCERS.find((f) => f.id === id) || FREELANCERS[0];
  const isSaved = savedFreelancerIds.includes(freelancer.id);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'portfolio' | 'reviews' | 'skills'
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);

  const similarFreelancers = FREELANCERS.filter(
    (f) => f.id !== freelancer.id && f.categoryId === freelancer.categoryId
  ).slice(0, 3);

  const handleMessageClick = () => {
    setActiveChatId('chat-1');
    navigate('/messages');
  };

  return (
    <PageTransition className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Profile Header Banner */}
      <div className="rounded-3xl overflow-hidden bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm mb-8">
        <div className="h-44 sm:h-56 w-full relative">
          <img
            src={freelancer.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            {/* Avatar & Main Info */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <div className="relative inline-block">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover ring-4 ring-white dark:ring-dark-card shadow-xl"
                />
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-dark-card rounded-full" />
              </div>

              <div className="space-y-1 sm:pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {freelancer.name}
                  </h1>
                  {freelancer.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                      <CheckCircle size={13} />
                      <span>Verified Expert</span>
                    </span>
                  )}
                  {freelancer.topRated && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      Top Rated
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {freelancer.title}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-dark-muted pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {freelancer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {freelancer.timezone} • {freelancer.responseTime} response
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Zap size={13} className="fill-current" /> {freelancer.jobSuccess}% Job Success
                  </span>
                </div>
              </div>
            </div>

            {/* Rates & CTAs */}
            <div className="flex sm:flex-col sm:items-end justify-between sm:justify-center gap-3 pt-2">
              <div className="text-left sm:text-right">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  ${freelancer.hourlyRate}
                  <span className="text-xs text-slate-500 font-normal"> / hour</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-dark-muted font-medium">
                  {freelancer.availability}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveFreelancer(freelancer.id)}
                  aria-label="Save profile"
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isSaved
                      ? 'bg-brand-50 dark:bg-brand-950 border-brand-300 dark:border-brand-700 text-brand-600 dark:text-brand-400'
                      : 'border-slate-200 dark:border-dark-border text-slate-500 hover:text-brand-500'
                  }`}
                >
                  <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
                </button>

                <button
                  onClick={handleMessageClick}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-dark-surface text-xs font-bold transition-colors"
                >
                  <MessageSquare size={14} />
                  <span>Message</span>
                </button>

                <Link
                  to="/post-job"
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:shadow-glow-brand transition-all"
                >
                  Hire {freelancer.name.split(' ')[0]}
                </Link>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 dark:border-dark-border gap-6 pt-4 text-xs sm:text-sm font-semibold overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'portfolio', label: `Portfolio (${freelancer.portfolio.length})` },
              { id: 'reviews', label: `Client Reviews (${freelancer.reviews.length})` },
              { id: 'skills', label: 'Skills & Certifications' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 relative transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-brand-500 dark:text-brand-400 font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Main Tab Area */}
        <div className="lg:col-span-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-7 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  About {freelancer.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {freelancer.bio}
                </p>
              </div>

              {/* Work Highlights */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-center">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {freelancer.completedProjects}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Completed Projects</div>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-center">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {freelancer.jobSuccess}%
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Job Success Score</div>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-center">
                  <div className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400">
                    {freelancer.earnings}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Total Jyruka Earnings</div>
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {freelancer.portfolio.length > 0 ? (
                freelancer.portfolio.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPortfolioItem(item)}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                        <span>View Project</span>
                        <ExternalLink size={14} />
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-dark-muted line-clamp-2 mb-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-12 text-center text-xs text-slate-400">
                  Portfolio projects are currently private or undergoing client verification.
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {freelancer.reviews.length > 0 ? (
                freelancer.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {rev.author}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {rev.company} • {rev.project}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <RatingStars rating={rev.rating} />
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border">
                  No public client reviews yet. Initial verified milestones are in progress.
                </div>
              )}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="p-7 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                  Verified Technical Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300"
                    >
                      <ShieldCheck size={14} className="text-brand-500" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-dark-border">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Languages
                </h4>
                <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300">
                  {freelancer.languages.map((lang) => (
                    <div key={lang} className="flex items-center gap-1.5">
                      <Globe size={13} className="text-slate-400" />
                      <span>{lang}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Trust & Guarantees
            </h3>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <span>100% money-back escrow protection on unapproved milestones.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Pre-vetted code reviews & identity verified by Jyruka Trust & Safety.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Proprietary IP assignment & comprehensive non-disclosure by default.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Portfolio Item Detail Modal */}
      {selectedPortfolioItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-slate-200 dark:border-dark-border shadow-2xl animate-in zoom-in-95">
            <div className="relative h-64 sm:h-80">
              <img
                src={selectedPortfolioItem.image}
                alt={selectedPortfolioItem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPortfolioItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedPortfolioItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedPortfolioItem.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {selectedPortfolioItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Similar Freelancers Row */}
      {similarFreelancers.length > 0 && (
        <div className="pt-8 border-t border-slate-200 dark:border-dark-border">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
            Similar Specialists in {freelancer.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarFreelancers.map((sim) => (
              <FreelancerCard key={sim.id} freelancer={sim} />
            ))}
          </div>
        </div>
      )}
    </PageTransition>
  );
}
