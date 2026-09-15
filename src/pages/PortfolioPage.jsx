import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowRight, Star } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import TiltCard from '../components/ui/TiltCard';
import { PORTFOLIO_PROJECTS } from '../data/mockData';

const CATEGORIES = ['All', 'Web & Cloud', 'AI & Data', 'UI/UX Design', 'Cloud Infrastructure', 'Growth'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500">
          Our Work
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Proven Engineering & Design Case Studies
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-dark-muted leading-relaxed">
          Explore how our targeted freelance pods helped venture-backed startups and scaleups ship high-performance systems and intuitive user experiences.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <TiltCard
                maxTilt={5}
                scale={1.02}
                onClick={() => setSelectedCaseStudy(project)}
                className="cursor-pointer rounded-3xl overflow-hidden bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-md text-[11px] font-bold text-brand-600 dark:text-brand-400">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-slate-400 font-semibold mb-1">
                      {project.client}
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {project.summary}
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-dark-border text-center">
                      {project.metrics.map((m, idx) => (
                        <div key={idx}>
                          <div className="text-xs font-black text-slate-900 dark:text-white">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-slate-400">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-brand-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Case Study →
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Detail Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-slate-200 dark:border-dark-border shadow-2xl my-8 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 shrink-0">
              <img
                src={selectedCaseStudy.thumbnail}
                alt={selectedCaseStudy.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-2.5 py-1 rounded-full bg-brand-500 text-[11px] font-bold uppercase mb-2 inline-block">
                  {selectedCaseStudy.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black">
                  {selectedCaseStudy.title}
                </h2>
                <div className="text-xs text-slate-300">Client: {selectedCaseStudy.client}</div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Metrics bar */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface/60 border border-slate-200/60 dark:border-dark-border text-center">
                {selectedCaseStudy.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-base sm:text-lg font-black text-brand-600 dark:text-brand-400">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-dark-muted font-medium">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
                    The Challenge
                  </h4>
                  <p>{selectedCaseStudy.challenge}</p>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
                    Our Solution & Architecture
                  </h4>
                  <p>{selectedCaseStudy.solution}</p>
                </div>
              </div>

              {/* Verified Client Testimonial */}
              <div className="p-5 rounded-2xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-800/60 space-y-2">
                <p className="text-xs sm:text-sm italic text-slate-800 dark:text-slate-200">
                  {selectedCaseStudy.testimonial}
                </p>
                <div className="text-[11px] font-bold text-brand-600 dark:text-brand-400">
                  — {selectedCaseStudy.author}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Technologies Utilized:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
