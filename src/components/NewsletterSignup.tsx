import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'compact' | 'banner' | 'home-banner';
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  idPrefix?: string;
}

export default function NewsletterSignup({
  variant = 'compact',
  title,
  description,
  placeholder,
  buttonText = 'Subscribe',
  idPrefix = 'newsletter',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      // Reset subscription status after some time
      setTimeout(() => setSubscribed(false), 6000);
    }
  };

  if (variant === 'compact') {
    return (
      <div id={`${idPrefix}-column`} className="space-y-4">
        <h3 className="text-xs font-bold tracking-wider text-slate-900 dark:text-slate-100 uppercase" id={`${idPrefix}-title`}>
          {title || 'The Weekly Byte'}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed" id={`${idPrefix}-desc`}>
          {description || 'Subscribe to receive short, punchy summaries of emergent web architectures and artificial intelligence agents directly in your inbox.'}
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col space-y-2" id={`${idPrefix}-form`}>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder || 'Enter your email'}
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-10 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 transition-colors"
              disabled={subscribed}
              id={`${idPrefix}-email-input`}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-500 transition-colors disabled:opacity-50"
              disabled={subscribed}
              id={`${idPrefix}-submit-btn`}
              aria-label="Submit"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <AnimatePresence>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center text-[11px] font-medium text-indigo-600 dark:text-indigo-400"
                id={`${idPrefix}-success-msg`}
              >
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-indigo-500" /> Subscribed successfully!
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    );
  }

  if (variant === 'home-banner') {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 px-6 py-10 shadow-xl dark:bg-slate-950 sm:px-12 sm:py-16" id={`${idPrefix}-home-banner`}>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
              {title || 'The GordonPike Insider.'}
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {description || 'Join a selective circle of senior developers, software architects, and tech enthusiasts. Receive strategic analysis on enterprise architectures, emergent AI skill engines, and decoupling tactics once a month. No spam, just pure technical craftsmanship.'}
            </p>
          </div>
          <div className="lg:col-span-5 w-full" id={`${idPrefix}-form-container`}>
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-xl bg-slate-800 border border-indigo-500/20 p-6 text-center text-white shadow-md"
                id={`${idPrefix}-success-card`}
              >
                <p className="font-sans text-lg font-bold text-indigo-400 mb-1 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="h-5 w-5 text-indigo-400" /> You’re on the list!
                </p>
                <p className="text-xs text-slate-400">Thank you for subscribing. I look forward to sharing insights with you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder || 'Enter your professional email'}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  id={`${idPrefix}-email-input`}
                />
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-all uppercase tracking-wider"
                  id={`${idPrefix}-submit-btn`}
                >
                  {buttonText}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // default variant === 'banner' (as used in BlogView)
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 py-12 px-6 shadow-xl dark:from-slate-900 dark:to-slate-950 sm:px-12 sm:py-16" id={`${idPrefix}-banner`}>
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
          {title || 'Engineering Insights, Delivered.'}
        </h2>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          {description || 'Get technical deep dives, custom blueprints, and structural reviews delivered straight to your inbox monthly. Subscribe below.'}
        </p>
        <div className="max-w-md mx-auto" id={`${idPrefix}-form-container`}>
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center space-x-2 rounded-lg bg-slate-800 border border-indigo-500/20 p-4 text-xs font-semibold text-indigo-400 shadow-md"
              id={`${idPrefix}-success-banner`}
            >
              <CheckCircle2 className="h-4 w-4 text-indigo-400" />
              <span>Subscribed successfully! Thank you.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder || 'you@enterprise.com'}
                className="flex-1 rounded-lg border border-indigo-500/20 bg-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-400 backdrop-blur-md focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-colors"
              />
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-all uppercase tracking-wider"
              >
                {buttonText}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
