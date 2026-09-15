import React, { useState } from 'react';
import { Mail, MessageCircle, Clock, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { FAQS } from '../data/mockData';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <PageTransition className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-2">
          Help & Inquiries
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          How Can We Help You?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted">
          Our global operations and dispute mediation squad is available around the clock.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Support Channels Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Direct Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Email Inquiries</div>
                  <p className="text-slate-500">support@jyruka.com</p>
                  <span className="text-[10px] text-brand-500">Response in &lt; 2 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Live Dispute Resolution</div>
                  <p className="text-slate-500">Available in your active contract dashboard</p>
                  <span className="text-[10px] text-emerald-500">24/7 Escrow arbitration</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Enterprise Concierge</div>
                  <p className="text-slate-500">enterprise@jyruka.com</p>
                  <span className="text-[10px] text-cyan-500">Dedicated SLA (1 hour)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 size={40} className="text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  A Jyruka support specialist has received your inquiry and will follow up within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@startup.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs text-slate-800 dark:text-white focus:border-brand-500 focus:outline-none"
                  >
                    <option value="General Inquiry" className="dark:bg-dark-card">General Inquiry</option>
                    <option value="Escrow Milestone Support" className="dark:bg-dark-card">Escrow Milestone Support</option>
                    <option value="Enterprise Hiring Consultation" className="dark:bg-dark-card">Enterprise Hiring Consultation</option>
                    <option value="Freelancer Verification Status" className="dark:bg-dark-card">Freelancer Verification Status</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you today?"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl text-xs focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
