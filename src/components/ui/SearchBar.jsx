import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, User, Briefcase, Tag } from 'lucide-react';
import { FREELANCERS, JOBS, CATEGORIES } from '../../data/mockData';

export default function SearchBar({
  placeholder = "Search talent, skills, or projects...",
  compact = false,
  autoFocus = false,
  onClose,
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();

  const matchingFreelancers = trimmed
    ? FREELANCERS.filter(
        (f) =>
          f.name.toLowerCase().includes(trimmed) ||
          f.title.toLowerCase().includes(trimmed) ||
          f.skills.some((s) => s.toLowerCase().includes(trimmed))
      ).slice(0, 3)
    : [];

  const matchingJobs = trimmed
    ? JOBS.filter(
        (j) =>
          j.title.toLowerCase().includes(trimmed) ||
          j.skills.some((s) => s.toLowerCase().includes(trimmed))
      ).slice(0, 2)
    : [];

  const matchingCategories = trimmed
    ? CATEGORIES.filter((c) => c.name.toLowerCase().includes(trimmed)).slice(0, 2)
    : [];

  const hasResults =
    matchingFreelancers.length > 0 || matchingJobs.length > 0 || matchingCategories.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/freelancers?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const selectItem = (path) => {
    navigate(path);
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
          <Search size={compact ? 16 : 18} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full bg-slate-100 dark:bg-dark-surface/90 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-dark-border focus:border-brand-500 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl transition-all duration-200 placeholder-slate-400 dark:placeholder-slate-500 ${
            compact ? 'pl-9 pr-14 py-2 text-xs' : 'pl-11 pr-24 py-3 text-sm'
          }`}
        />

        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={14} />
          </button>
        ) : !compact ? (
          <div className="absolute right-3 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-card text-[10px] text-slate-400 font-mono">
            <span>⌘</span>K
          </div>
        ) : null}

        <button
          type="submit"
          className="absolute right-2 px-2.5 py-1 text-xs font-semibold bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors hidden sm:inline-flex items-center gap-1"
        >
          Go
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && trimmed && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl shadow-xl overflow-hidden z-50 divide-y divide-slate-100 dark:divide-dark-border">
          {hasResults ? (
            <div className="p-2 space-y-3 max-h-96 overflow-y-auto">
              {/* Freelancers */}
              {matchingFreelancers.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <User size={12} />
                    <span>Freelancers</span>
                  </div>
                  {matchingFreelancers.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => selectItem(`/freelancer/${f.id}`)}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-surface text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={f.avatar}
                          alt={f.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {f.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {f.title}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        ${f.hourlyRate}/hr
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Categories */}
              {matchingCategories.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <Tag size={12} />
                    <span>Categories</span>
                  </div>
                  {matchingCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => selectItem(`/freelancers?category=${encodeURIComponent(c.name)}`)}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-surface text-left text-xs font-medium text-slate-800 dark:text-slate-200"
                    >
                      <span>{c.name}</span>
                      <span className="text-[11px] text-slate-400">{c.projectCount} jobs</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Jobs */}
              {matchingJobs.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <Briefcase size={12} />
                    <span>Projects</span>
                  </div>
                  {matchingJobs.map((j) => (
                    <button
                      key={j.id}
                      onClick={() => selectItem(`/freelancers`)}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-surface text-left"
                    >
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                        {j.title}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0 ml-2">
                        {j.budget}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              No matching talent or projects found for "{query}".
            </div>
          )}

          <div className="p-2.5 bg-slate-50 dark:bg-dark-surface/40 flex justify-between items-center text-xs text-slate-500">
            <span>Press Enter to search all freelancers</span>
            <button
              onClick={handleSubmit}
              className="text-brand-500 font-semibold flex items-center gap-1 hover:underline"
            >
              Search all <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
