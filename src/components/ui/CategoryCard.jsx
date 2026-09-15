import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import TiltCard from './TiltCard';

export default function CategoryCard({ category }) {
  // Dynamically resolve icon from Lucide
  const IconComponent = Icons[category.icon] || Icons.Folder;

  return (
    <Link to={`/freelancers?category=${encodeURIComponent(category.name)}`}>
      <TiltCard
        maxTilt={8}
        scale={1.03}
        className="h-full p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-lg dark:hover:shadow-glow-brand/10 transition-all duration-300 group flex flex-col justify-between"
      >
        <div>
          {/* Icon Badge */}
          <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800/60 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 mb-4 shadow-sm">
            <IconComponent size={22} />
          </div>

          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors mb-1.5">
            {category.name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-dark-muted line-clamp-2 leading-relaxed mb-4">
            {category.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-xs text-slate-500 dark:text-dark-muted">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {category.projectCount.toLocaleString()} Projects
          </span>
          <span className="group-hover:translate-x-1 transition-transform text-brand-500 font-medium">
            Browse →
          </span>
        </div>
      </TiltCard>
    </Link>
  );
}
