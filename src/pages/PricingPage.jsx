import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, ChevronDown, Sparkles, HelpCircle } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import PricingTable from '../components/ui/PricingTable';
import { FAQS } from '../data/mockData';

const COMPARISON_ROWS = [
  { feature: 'Job Openings', starter: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Platform Posting Fee', starter: '0%', pro: '0%', enterprise: '0%' },
  { feature: 'Escrow Milestone Protection', starter: true, pro: true, enterprise: true },
  { feature: 'Direct Messaging & File Sharing', starter: true, pro: true, enterprise: true },
  { feature: 'AI-Powered Fast Match (< 12h)', starter: false, pro: true, enterprise: true },
  { feature: 'Dedicated Technical Recruiter', starter: false, pro: true, enterprise: true },
  { feature: 'Custom NDA & IP Agreements', starter: false, pro: true, enterprise: true },
  { feature: 'Payment Processing Fee', starter: '3.0%', pro: '1.5%', enterprise: 'Volume discounted' },
  { feature: 'SOC2 & Enterprise Compliance', starter: false, pro: false, enterprise: true },
  { feature: 'Custom Payroll & ERP Integrations', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated Account Director & SLA', starter: '24h support', pro: '4h support', enterprise: '1h SLA' },
];

export default function PricingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? -1 : idx);
  };

  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
          Simple, Transparent Pricing
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Invest in Top Talent, Without Surprises
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted">
          Zero upfront posting fees. Upgrade to Pro for priority matching and reduced processing fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mb-20">
        <PricingTable />
      </div>

      {/* Feature Comparison Matrix */}
      <div className="mb-20">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center mb-8">
          Detailed Plan Feature Comparison
        </h2>

        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface/50">
                <th className="p-4 font-bold text-slate-900 dark:text-white">Feature</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white text-center">Starter</th>
                <th className="p-4 font-bold text-brand-500 text-center">Pro</th>
                <th className="p-4 font-bold text-slate-900 dark:text-white text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-dark-surface/30">
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                    {row.feature}
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    {typeof row.starter === 'boolean' ? (
                      row.starter ? (
                        <Check size={16} className="mx-auto text-emerald-500" />
                      ) : (
                        <Minus size={16} className="mx-auto text-slate-300" />
                      )
                    ) : (
                      row.starter
                    )}
                  </td>
                  <td className="p-4 text-center font-semibold text-brand-600 dark:text-brand-400">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? (
                        <Check size={16} className="mx-auto text-emerald-500" />
                      ) : (
                        <Minus size={16} className="mx-auto text-slate-300" />
                      )
                    ) : (
                      row.pro
                    )}
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    {typeof row.enterprise === 'boolean' ? (
                      row.enterprise ? (
                        <Check size={16} className="mx-auto text-emerald-500" />
                      ) : (
                        <Minus size={16} className="mx-auto text-slate-300" />
                      )
                    ) : (
                      row.enterprise
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center mb-6">
          Pricing FAQs
        </h2>

        <div className="space-y-3">
          {FAQS.slice(0, 4).map((faq, idx) => {
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
