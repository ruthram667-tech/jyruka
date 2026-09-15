import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Tag, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import CategoryCard from '../components/ui/CategoryCard';
import { CATEGORIES } from '../data/mockData';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <PageTransition className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            Explore All Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted">
            Find vetted specialists across every critical domain of modern software, design, and growth.
          </p>
        </div>

        {/* Category search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories or skills..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-dark-card text-xs text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-dark-border focus:border-brand-500 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredCategories.map((category) => (
          <div key={category.id} className="flex flex-col space-y-3">
            <CategoryCard category={category} />
            {/* Direct skill links */}
            <div className="flex flex-wrap gap-1 px-1">
              {category.skills.slice(0, 5).map((skill) => (
                <Link
                  key={skill}
                  to={`/freelancers?q=${encodeURIComponent(skill)}`}
                  className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-surface/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors"
                >
                  {skill}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Popular Skills Cloud */}
      <div className="p-8 rounded-3xl bg-slate-100/60 dark:bg-dark-card/40 border border-slate-200/80 dark:border-dark-border text-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Can't find what you're looking for?
        </h3>
        <p className="text-xs text-slate-500 dark:text-dark-muted max-w-md mx-auto mb-6">
          Post your custom project brief and our automated matching algorithm will notify relevant verified engineers within hours.
        </p>
        <Link
          to="/post-job"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition-all"
        >
          <span>Post a Custom Job</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </PageTransition>
  );
}
