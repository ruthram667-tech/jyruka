import React, { useState } from 'react';
import { Clock, Calendar, ArrowRight, X, User } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import TiltCard from '../components/ui/TiltCard';
import { BLOG_POSTS } from '../data/mockData';

const CATEGORIES = ['All', 'Hiring Strategy', 'Engineering', 'Client Guides'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredPosts =
    activeCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
          Insights & Guides
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          The Future of Engineering & Independent Work
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted">
          Frameworks, technical deep dives, and hiring strategies for modern technical leaders.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {filteredPosts.map((post) => (
          <TiltCard
            key={post.id}
            onClick={() => setSelectedArticle(post)}
            className="cursor-pointer rounded-3xl overflow-hidden bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-md text-[11px] font-bold text-brand-600 dark:text-brand-400">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-dark-muted line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 dark:border-dark-border flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {post.author.name}
                </span>
              </div>
              <span className="text-xs font-bold text-brand-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read →
              </span>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-slate-200 dark:border-dark-border shadow-2xl my-8 max-h-[90vh] flex flex-col">
            <div className="relative h-64 shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="font-bold text-brand-500">{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 py-3 border-y border-slate-100 dark:border-dark-border">
                <img
                  src={selectedArticle.author.avatar}
                  alt={selectedArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {selectedArticle.author.name}
                  </div>
                  <div className="text-[11px] text-slate-400">Author & Staff Contributor</div>
                </div>
              </div>

              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                <p className="font-medium text-base text-slate-900 dark:text-white">
                  {selectedArticle.excerpt}
                </p>
                <p>{selectedArticle.content}</p>
                <p>
                  High-performing software companies understand that engineering bandwidth isn’t linear. By decoupling core architectural leadership from specialized execution contractors, projects ship with fewer dependencies and lower organizational overhead.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
