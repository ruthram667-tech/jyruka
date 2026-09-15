import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import TiltCard from '../components/ui/TiltCard';
import { PRICING_PACKAGES, FAQS } from '../data/mockData';

export default function PricingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? -1 : idx);
  };

  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500">
          Transparent Investment
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Flexible Engagement Packages
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-dark-muted leading-relaxed">
          No hidden fees or bloated agency markups. Choose a 2-week scoped sprint, an ongoing dedicated pod, or custom enterprise terms.
        </p>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
        {PRICING_PACKAGES.map((pkg) => {
          const isPro = pkg.popular;

          return (
            <TiltCard
              key={pkg.name}
              maxTilt={isPro ? 6 : 4}
              scale={isPro ? 1.03 : 1.01}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                isPro
                  ? 'bg-gradient-to-b from-brand-900/40 via-dark-card to-dark-card dark:from-brand-950/80 dark:via-dark-card border-2 border-brand-500 shadow-2xl shadow-brand-500/15'
                  : 'bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm'
              }`}
            >
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-purple text-white text-[11px] font-bold tracking-wide uppercase flex items-center gap-1 shadow-md">
                  <Sparkles size={12} />
                  <span>Most Selected</span>
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-dark-muted min-h-[34px]">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-dark-border">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                      {pkg.fee}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-dark-muted mt-1 font-medium">
                    {pkg.feeSubtitle}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    What's Included:
                  </div>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all text-center block ${
                  isPro
                    ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/25 hover:shadow-glow-brand'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-dark-surface dark:hover:bg-slate-800 text-slate-900 dark:text-white'
                }`}
              >
                {pkg.ctaText}
              </Link>
            </TiltCard>
          );
        })}
      </div>

      {/* Pricing FAQs */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center mb-6">
          Pricing & Billing FAQs
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-dark-border/60 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
