import React from 'react';

export function FreelancerCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border animate-pulse shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700/60" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700/60 rounded" />
            <div className="w-20 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="w-16 h-6 bg-slate-200 dark:bg-slate-700/60 rounded-full" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700/60 rounded" />
        <div className="w-4/5 h-3.5 bg-slate-100 dark:bg-slate-800 rounded" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="w-16 h-5 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
        <div className="w-20 h-5 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
        <div className="w-14 h-5 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="w-24 h-5 bg-slate-200 dark:bg-slate-700/60 rounded" />
        <div className="w-20 h-8 bg-slate-200 dark:bg-slate-700/60 rounded-lg" />
      </div>
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border animate-pulse shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="w-2/3 h-5 bg-slate-200 dark:bg-slate-700/60 rounded" />
        <div className="w-20 h-6 bg-slate-200 dark:bg-slate-700/60 rounded-full" />
      </div>
      <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded mb-2" />
      <div className="w-3/4 h-3.5 bg-slate-100 dark:bg-slate-800 rounded mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="w-16 h-5 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
        <div className="w-16 h-5 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
      </div>
      <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700/60 rounded" />
        <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700/60 rounded" />
      </div>
    </div>
  );
}
