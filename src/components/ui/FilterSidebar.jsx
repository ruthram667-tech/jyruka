import React from 'react';
import { Filter, RotateCcw, Star, X } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

const ALL_SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'PyTorch',
  'Figma',
  'UI/UX Design',
  'Kubernetes',
  'AWS',
  'Node.js',
  'Tailwind CSS',
  'Cinema 4D',
  'LangChain',
  'Technical SEO',
];

export default function FilterSidebar({
  filters,
  setFilters,
  resetFilters,
  isOpen = true,
  onClose,
}) {
  const toggleCategory = (catName) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(catName);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== catName)
          : [...prev.categories, catName],
      };
    });
  };

  const toggleSkill = (skill) => {
    setFilters((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill],
      };
    });
  };

  return (
    <div className="w-full bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border rounded-2xl p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-dark-border">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-brand-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-brand-500 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Hourly Rate Range */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Max Hourly Rate
          </label>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
            ${filters.maxRate}/hr
          </span>
        </div>
        <input
          type="range"
          min="40"
          max="200"
          step="5"
          value={filters.maxRate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxRate: Number(e.target.value) }))
          }
          className="w-full h-1.5 bg-slate-200 dark:bg-dark-surface rounded-lg appearance-none cursor-pointer accent-brand-500"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>$40</span>
          <span>$120</span>
          <span>$200+</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2.5">
          Categories
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => {
            const isChecked = filters.categories.includes(cat.name);
            return (
              <label
                key={cat.id}
                className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer py-1 px-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-surface/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat.name)}
                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500/20"
                  />
                  <span>{cat.name}</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {cat.projectCount}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
          Minimum Rating
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {[4.5, 4.8, 4.9].map((ratingVal) => (
            <button
              key={ratingVal}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: prev.minRating === ratingVal ? 0 : ratingVal,
                }))
              }
              className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-medium border transition-colors ${
                filters.minRating === ratingVal
                  ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-400 text-brand-600 dark:text-brand-400'
                  : 'border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>{ratingVal}+</span>
            </button>
          ))}
        </div>
      </div>

      {/* Skills cloud */}
      <div>
        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
          Skills
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {ALL_SKILLS.map((skill) => {
            const isSelected = filters.skills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                    : 'bg-slate-50 dark:bg-dark-surface text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
          Availability
        </h4>
        <div className="space-y-1.5">
          {['all', 'Available Now', 'Part-time'].map((avail) => (
            <label
              key={avail}
              className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <input
                type="radio"
                name="availability"
                checked={filters.availability === avail}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, availability: avail }))
                }
                className="text-brand-500 focus:ring-brand-500/20"
              />
              <span>{avail === 'all' ? 'All Freelancers' : avail}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
