import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, CheckCircle, MapPin, Zap } from 'lucide-react';
import TiltCard from './TiltCard';
import RatingStars from './RatingStars';
import { useApp } from '../../context/AppContext';

export default function FreelancerCard({ freelancer }) {
  const { savedFreelancerIds, toggleSaveFreelancer } = useApp();
  const isSaved = savedFreelancerIds.includes(freelancer.id);

  return (
    <TiltCard className="h-full rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-xl dark:hover:shadow-glow-brand/20 transition-shadow duration-300 flex flex-col justify-between p-6 group">
      <div>
        {/* Top Header: Avatar, Info, Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-500/20 group-hover:ring-brand-500 transition-all duration-300"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-dark-card rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <Link
                  to={`/freelancer/${freelancer.id}`}
                  className="font-bold text-base text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors line-clamp-1"
                >
                  {freelancer.name}
                </Link>
                {freelancer.verified && (
                  <CheckCircle size={15} className="text-brand-500 fill-brand-500/20 shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-dark-muted mt-0.5">
                <MapPin size={12} />
                <span>{freelancer.location}</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveFreelancer(freelancer.id);
            }}
            aria-label="Save Freelancer"
            className={`p-2 rounded-xl border transition-all duration-200 ${
              isSaved
                ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-300 dark:border-brand-700 text-brand-600 dark:text-brand-400'
                : 'border-slate-200 dark:border-dark-border text-slate-400 hover:text-brand-500 hover:border-brand-200 dark:hover:border-brand-800'
            }`}
          >
            <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200 line-clamp-1 mb-2">
          {freelancer.title}
        </h3>

        {/* Bio snippet */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {freelancer.bio}
        </p>

        {/* Ratings & Job Success */}
        <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-dark-surface/60 border border-slate-100 dark:border-slate-800/80 mb-4">
          <RatingStars rating={freelancer.rating} />
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Zap size={13} className="fill-current" />
            <span>{freelancer.jobSuccess}% Success</span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {freelancer.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50"
            >
              {skill}
            </span>
          ))}
          {freelancer.skills.length > 4 && (
            <span className="text-[10px] font-medium px-2 py-1 rounded-md text-slate-400 dark:text-slate-500">
              +{freelancer.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Rate & Action Button */}
      <div className="pt-4 border-t border-slate-100 dark:border-dark-border flex items-center justify-between gap-2">
        <div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            ${freelancer.hourlyRate}
          </span>
          <span className="text-xs text-slate-500 dark:text-dark-muted">/hr</span>
        </div>

        <Link
          to={`/freelancer/${freelancer.id}`}
          className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow-glow-brand transition-all duration-200"
        >
          View Profile
        </Link>
      </div>
    </TiltCard>
  );
}
