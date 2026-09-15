import React from 'react';
import * as Icons from 'lucide-react';
import TiltCard from './TiltCard';

export default function StepCard({ step, index }) {
  const IconComponent = Icons[step.icon] || Icons.CheckCircle;

  return (
    <TiltCard
      maxTilt={6}
      scale={1.02}
      className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-lg dark:hover:shadow-glow-brand/10 transition-all duration-300 relative group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800/60 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
          <IconComponent size={22} />
        </div>
        <span className="text-3xl font-extrabold text-slate-200 dark:text-slate-800 select-none group-hover:text-brand-500/30 transition-colors">
          {step.step}
        </span>
      </div>

      <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
        {step.title}
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        {step.description}
      </p>
    </TiltCard>
  );
}
