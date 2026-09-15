import React from 'react';
import { Bookmark, Clock, DollarSign, Users } from 'lucide-react';
import TiltCard from './TiltCard';
import { useApp } from '../../context/AppContext';

export default function JobCard({ job, onApply }) {
  const { savedJobIds, toggleSaveJob } = useApp();
  const isSaved = savedJobIds.includes(job.id);

  return (
    <TiltCard className="h-full rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border p-6 shadow-sm hover:shadow-xl dark:hover:shadow-glow-brand/10 transition-shadow duration-300 flex flex-col justify-between group">
      <div>
        {/* Category & Posted Time */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60">
            {job.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} />
            <span>{job.postedTime}</span>
          </div>
        </div>

        {/* Job Title */}
        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-2">
          {job.title}
        </h3>

        {/* Client details & budget */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-dark-muted mb-3">
          <span>Client: <strong className="text-slate-800 dark:text-slate-200">{job.client}</strong></span>
          <span>•</span>
          <span>{job.experience}</span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer info: budget, proposals & actions */}
      <div className="pt-4 border-t border-slate-100 dark:border-dark-border flex items-center justify-between gap-2">
        <div>
          <div className="text-xs text-slate-400 font-medium">{job.type}</div>
          <div className="text-base font-bold text-slate-900 dark:text-white text-emerald-600 dark:text-emerald-400">
            {job.budget}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSaveJob(job.id)}
            aria-label="Save Job"
            className={`p-2 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-300 dark:border-brand-700 text-brand-600 dark:text-brand-400'
                : 'border-slate-200 dark:border-dark-border text-slate-400 hover:text-brand-500'
            }`}
          >
            <Bookmark size={15} className={isSaved ? 'fill-current' : ''} />
          </button>

          <button
            onClick={onApply}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500 text-white transition-colors shadow-sm"
          >
            Apply Now
          </button>
        </div>
      </div>
    </TiltCard>
  );
}
