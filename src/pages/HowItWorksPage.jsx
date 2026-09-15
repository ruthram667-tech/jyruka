import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ShieldCheck,
  Lock,
  FileText,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import StepCard from '../components/ui/StepCard';
import { HOW_IT_WORKS_STEPS, FAQS } from '../data/mockData';

export default function HowItWorksPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? -1 : idx);
  };

  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500">
          Engagement Model
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          How You Build with Jyruka
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-dark-muted leading-relaxed">
          From the first discovery call to your production deployment, our transparent milestone framework keeps your roadmap on time, on budget, and completely secure.
        </p>
      </div>

      {/* 4 Step Process Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {HOW_IT_WORKS_STEPS.map((step, idx) => (
          <StepCard key={step.step} step={step} index={idx} />
        ))}
      </div>

      {/* Escrow & Trust Protection Callout */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-brand-950/70 via-dark-card to-dark-surface border border-brand-800/40 text-white mb-20 shadow-xl">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase">
            <Lock size={13} />
            <span>Milestone Escrow Guarantee</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            You Only Release Payment for Approved Deliverables
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We eliminate the risk of hiring external contractors. Your sprint funds remain safeguarded in third-party escrow. As work is completed in weekly demo cycles, you review the pull requests, Figma designs, or benchmarks before approving fund releases.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-sm mb-1 text-emerald-400">1. Deposit Sprint Funds</div>
              <p className="text-slate-400">Escrow funds before work begins to align incentives.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-sm mb-1 text-cyan-400">2. Inspect Code & UI</div>
              <p className="text-slate-400">Inspect git commits, test coverage, and live previews.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-sm mb-1 text-purple-400">3. Release & Handover</div>
              <p className="text-slate-400">Release milestone funds with complete IP assignment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-dark-muted">
            Have questions about agreements, pods, or payments? Here are answers.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
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

      {/* CTA Box */}
      <div className="text-center py-10">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all"
        >
          <span>Ready to discuss your project?</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </PageTransition>
  );
}
