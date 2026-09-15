import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { PRICING_TIERS } from '../../data/mockData';
import TiltCard from './TiltCard';

export default function PricingTable({ onSelectPlan }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  return (
    <div>
      {/* Billing Switcher */}
      <div className="flex justify-center mb-10">
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border inline-flex items-center gap-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-dark-card text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-dark-card text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {PRICING_TIERS.map((tier) => {
          const isPro = tier.popular;
          const displayFee =
            billingCycle === 'annual' && tier.fee.startsWith('$')
              ? `$${Math.round(parseInt(tier.fee.replace('$', '')) * 0.8)}`
              : tier.fee;

          return (
            <TiltCard
              key={tier.name}
              maxTilt={isPro ? 6 : 4}
              scale={isPro ? 1.03 : 1.01}
              className={`rounded-3xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                isPro
                  ? 'bg-gradient-to-b from-brand-900/40 via-dark-card to-dark-card dark:from-brand-950/80 dark:via-dark-card border-2 border-brand-500 shadow-xl shadow-brand-500/10'
                  : 'bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm'
              }`}
            >
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-purple text-white text-[11px] font-bold tracking-wide uppercase flex items-center gap-1 shadow-md">
                  <Sparkles size={12} />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-dark-muted min-h-[32px]">
                    {tier.tagline}
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-dark-border">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                      {displayFee}
                    </span>
                    {tier.fee.startsWith('$') && (
                      <span className="text-xs text-slate-400">/mo</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-dark-muted mt-1">
                    {tier.feeSubtitle}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                    Included Features:
                  </div>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlan && onSelectPlan(tier.name)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm ${
                  isPro
                    ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-glow-brand'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-dark-surface dark:hover:bg-slate-800 text-slate-900 dark:text-white'
                }`}
              >
                {tier.ctaText}
              </button>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}
