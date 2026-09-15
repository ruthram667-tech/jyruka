import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import FilterSidebar from '../components/ui/FilterSidebar';
import FreelancerCard from '../components/ui/FreelancerCard';
import { FreelancerCardSkeleton } from '../components/ui/SkeletonLoader';
import { FREELANCERS } from '../data/mockData';

export default function BrowseFreelancersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'rate-asc' | 'rate-desc' | 'projects'
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
    skills: [],
    maxRate: 200,
    minRating: 0,
    availability: 'all',
  });

  // Sync category from URL param if changed
  useEffect(() => {
    if (initialCategory && !filters.categories.includes(initialCategory)) {
      setFilters((prev) => ({ ...prev, categories: [initialCategory] }));
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const resetFilters = () => {
    setFilters({
      categories: [],
      skills: [],
      maxRate: 200,
      minRating: 0,
      availability: 'all',
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 700);
  };

  // Filter and sort logic
  const filteredFreelancers = useMemo(() => {
    return FREELANCERS.filter((f) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(q);
        const matchesTitle = f.title.toLowerCase().includes(q);
        const matchesSkill = f.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTitle && !matchesSkill) return false;
      }

      // Categories filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(f.category)) return false;
      }

      // Skills filter
      if (filters.skills.length > 0) {
        const hasAllSkills = filters.skills.every((sk) => f.skills.includes(sk));
        if (!hasAllSkills) return false;
      }

      // Max Rate
      if (f.hourlyRate > filters.maxRate) return false;

      // Min Rating
      if (filters.minRating > 0 && f.rating < filters.minRating) return false;

      // Availability
      if (filters.availability !== 'all' && f.availability !== filters.availability) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'rate-asc') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'rate-desc') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
      return 0;
    });
  }, [FREELANCERS, searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredFreelancers.length / itemsPerPage) || 1;
  const paginatedFreelancers = filteredFreelancers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <PageTransition className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          Browse Verified Freelancers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted">
          Connect with vetted senior developers, designers, and AI specialists ready for contract work.
        </p>
      </div>

      {/* Toolbar: Search input, Sort, Mobile filter button & Skeleton toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by name, skill, or role..."
            className="w-full bg-slate-100 dark:bg-dark-surface text-slate-900 dark:text-white px-3.5 py-2 rounded-xl text-xs border border-slate-200 dark:border-dark-border focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Skeleton simulation button */}
          <button
            onClick={simulateLoading}
            title="Simulate Skeleton Loading State"
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-surface transition-colors"
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin text-brand-500' : ''} />
            <span className="hidden md:inline">Simulate Reload</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-xs">
            <ArrowUpDown size={14} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="rating" className="dark:bg-dark-card">Highest Rated</option>
              <option value="rate-asc" className="dark:bg-dark-card">Rate: Low to High</option>
              <option value="rate-desc" className="dark:bg-dark-card">Rate: High to Low</option>
              <option value="projects" className="dark:bg-dark-card">Most Projects</option>
            </select>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-500 text-white text-xs font-semibold shadow-sm"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
          />
        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-sm m-auto">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                onClose={() => setMobileFilterOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Results Area */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-dark-muted font-medium px-1">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredFreelancers.length}</strong> verified specialists
            </span>
          </div>

          {/* Grid / Skeletons */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(itemsPerPage)].map((_, i) => (
                <FreelancerCardSkeleton key={i} />
              ))}
            </div>
          ) : paginatedFreelancers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedFreelancers.map((fl) => (
                <FreelancerCard key={fl.id} freelancer={fl} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border space-y-3">
              <div className="text-3xl">🔍</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No freelancers match your current criteria
              </h3>
              <p className="text-xs text-slate-500 dark:text-dark-muted max-w-sm mx-auto">
                Try loosening your filters, increasing the hourly rate slider, or clearing your search term.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && !isLoading && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === idx + 1
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
