import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Lock,
  BadgeCheck,
  Zap,
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import StepCard from '../components/ui/StepCard';
import { HOW_IT_WORKS, FAQS } from '../data/mockData';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('client');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? -1 : idx);
  };

  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
          Transparent Process
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          How Jyruka Connects Elite Talent
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted mb-8">
          A modern marketplace built on trust, milestone escrow security, and strict quality verification.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
          <button
            onClick={() => setActiveTab('client')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'client'
                ? 'bg-brand-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            I Want to Hire (Clients)
          </button>
          <button
            onClick={() => setActiveTab('freelancer')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'freelancer'
                ? 'bg-brand-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            I Want to Work (Freelancers)
          </button>
        </div>
      </div>

      {/* Step Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {HOW_IT_WORKS[activeTab].map((step, idx) => (
          <StepCard key={step.step} step={step} index={idx} />
        ))}
      </div>

      {/* Security & Escrow Deep Dive */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-brand-950/60 via-dark-card to-dark-surface border border-brand-800/40 text-white mb-20 shadow-xl">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase">
            <Lock size={13} />
            <span>Escrow Guarantee</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Work with 100% Peace of Mind
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Funds are never sent directly to a contractor before work begins. Instead, they sit in neutral escrow. As a client, you only release funds once you verify each completed milestone against your specification. If expectations aren't met, funds remain protected.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-sm mb-1 text-emerald-400">01. Deposit</div>
              <p className="text-slate-400">Deposit milestone funds securely to initiate work.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-sm mb-1 text-cyan-400">02. Inspect</div>
              <p className="text-slate-400">Inspect git commits, pull requests, or Figma designs.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-sm mb-1 text-purple-400">03. Release</div>
              <p className="text-slate-400">Release payment with a single click once satisfied.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-dark-muted">
            Have questions about billing, contracts, or vetting? We've got answers.
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
    </PageTransition>
  );
}
