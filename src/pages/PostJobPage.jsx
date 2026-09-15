import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  DollarSign,
  Clock,
  Sparkles,
  UploadCloud,
  FileText,
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { CATEGORIES } from '../data/mockData';

const STEPS = [
  { id: 1, title: 'Title & Category' },
  { id: 2, title: 'Scope & Skills' },
  { id: 3, title: 'Budget & Pricing' },
  { id: 4, title: 'Project Details' },
  { id: 5, title: 'Review & Post' },
];

export default function PostJobPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Development & Tech',
    projectSize: 'Medium (1-3 months)',
    experience: 'Expert',
    skills: ['React', 'TypeScript'],
    paymentType: 'Fixed Price',
    budget: '$5,000',
    description: '',
    deliverables: '',
  });

  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (sk) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== sk),
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Trigger celebratory confetti!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#a855f7'],
      });
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <PageTransition className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Step Progress Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          Post a New Project Opening
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted mb-6">
          Reach top 3% verified specialists in under 48 hours. Escrow protected.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-dark-surface h-2 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-600 to-accent-cyan"
            initial={{ width: '20%' }}
            animate={{ width: `${(currentStep / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Numbers & Titles */}
        <div className="hidden sm:grid grid-cols-5 gap-2 text-center text-xs">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`font-semibold transition-colors ${
                currentStep >= step.id
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-slate-400'
              }`}
            >
              <span>{step.id}. {step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-xl">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 size={42} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Project Published Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Your opening "<strong>{formData.title || 'Untitled Project'}</strong>" is now live on Jyruka. Our matching engine is notifying relevant verified engineers.
              </p>
              <div className="flex justify-center gap-3 pt-4">
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/freelancers"
                  className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-dark-surface text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Browse Matching Talent
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Step 1: Title & Category */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Build Real-Time Trading Platform in Next.js & WebSockets"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-sm focus:border-brand-500 focus:outline-none"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      A clear, technical headline attracts 3x more senior applicants.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Primary Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-sm text-slate-800 dark:text-white focus:border-brand-500 focus:outline-none"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.name} className="dark:bg-dark-card">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Scope & Skills */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Project Size & Duration
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        'Small (< 1 month)',
                        'Medium (1-3 months)',
                        'Large (3-6+ months)',
                      ].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectSize: size })}
                          className={`p-3.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            formData.projectSize === size
                              ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-400 shadow-sm'
                              : 'border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Required Skills & Technologies
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="Add required skill (e.g. PyTorch, GraphQL)"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs focus:border-brand-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 py-2 bg-slate-900 dark:bg-dark-surface text-white rounded-xl text-xs font-semibold hover:bg-brand-600 transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((s) => (
                        <span
                          key={s}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/50 border border-brand-200/60 dark:border-brand-800 text-xs font-semibold text-brand-600 dark:text-brand-400"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() => removeSkill(s)}
                            className="hover:text-rose-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Budget & Pricing */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Payment Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Fixed Price', 'Hourly Contract'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentType: type })}
                          className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                            formData.paymentType === type
                              ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-400 shadow-sm'
                              : 'border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          <DollarSign size={20} />
                          <span>{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Estimated Budget ({formData.paymentType})
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      placeholder={
                        formData.paymentType === 'Fixed Price'
                          ? 'e.g. $8,500'
                          : 'e.g. $90 - $140 / hr'
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-sm focus:border-brand-500 focus:outline-none"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      All funds remain protected in escrow until you approve completed deliverables.
                    </span>
                  </div>
                </div>
              )}

              {/* Step 4: Project Details */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Detailed Project Description
                    </label>
                    <textarea
                      rows={5}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Outline the core deliverables, tech stack requirements, design references, and any milestones..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs sm:text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="border-2 border-dashed border-slate-200 dark:border-dark-border rounded-2xl p-6 text-center">
                    <UploadCloud size={28} className="mx-auto text-slate-400 mb-2" />
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Upload specifications, Figma links or wireframes (optional)
                    </div>
                    <span className="text-[10px] text-slate-400">
                      PDF, DOCX, ZIP up to 50MB
                    </span>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Post */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-surface/60 border border-slate-200 dark:border-dark-border space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-brand-500 uppercase">
                        {formData.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                        {formData.title || 'Untitled Project'}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400">Budget:</span>{' '}
                        <strong className="text-emerald-500 font-bold">{formData.budget}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Scope:</span>{' '}
                        <strong className="text-slate-700 dark:text-slate-200">{formData.projectSize}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block mb-1.5">Required Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {formData.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {formData.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200/60 dark:border-dark-border">
                        {formData.description}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-6 border-t border-slate-100 dark:border-dark-border flex justify-between items-center">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border text-xs font-semibold hover:bg-slate-50 dark:hover:bg-dark-surface transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition-all"
                >
                  <span>{currentStep === 5 ? 'Publish Job Opening' : 'Next Step'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
