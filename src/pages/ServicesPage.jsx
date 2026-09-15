import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import TiltCard from '../components/ui/TiltCard';
import { SERVICES } from '../data/mockData';

export default function ServicesPage() {
  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500">
          Our Capabilities
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Specialized Engineering & Design Pods
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-dark-muted leading-relaxed">
          We don't offer generic staffing. Jyruka deploys targeted, cross-functional pods equipped with battle-tested architectures, automated test suites, and strict delivery timelines.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {SERVICES.map((service) => {
          const IconComponent = Icons[service.icon] || Icons.Code2;

          return (
            <TiltCard
              key={service.id}
              maxTilt={4}
              scale={1.01}
              className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200/60 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                    <IconComponent size={26} />
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-300">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Deliverables */}
                <div className="mb-6 space-y-2.5">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Core Deliverables:
                  </div>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="mb-6">
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">Technologies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer info & CTA */}
              <div className="pt-6 border-t border-slate-100 dark:border-dark-border flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Estimated Timeline: <strong className="text-slate-900 dark:text-white">{service.typicalTimeline}</strong>
                </span>

                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Request Service →
                </Link>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Engagement Guarantee Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-950/70 via-dark-card to-dark-surface border border-brand-800/40 text-white text-center max-w-4xl mx-auto shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Need a Custom Multi-Disciplinary Pod?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
          Many projects require a blend of AI engineering, UI design, and cloud hardening. We configure custom cross-functional teams aligned to your exact milestone goals.
        </p>
        <Link
          to="/contact"
          className="inline-block px-6 py-3.5 rounded-xl bg-white text-brand-900 hover:bg-brand-50 font-bold text-xs shadow-md transition-all"
        >
          Book a Scope Review
        </Link>
      </div>
    </PageTransition>
  );
}
