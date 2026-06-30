import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Presentation, Calendar, Clock, Terminal, ChevronRight } from 'lucide-react';
import { Article, Presentation as PresentationType, View } from '../types';
import { ARTICLES, PRESENTATIONS } from '../data';
import NewsletterSignup from './NewsletterSignup';

interface HomeViewProps {
  onNavigate: (view: View, itemId?: string) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="space-y-20 pb-20" id="home-view-container">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors py-16 sm:py-24" id="home-hero">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-indigo-100),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.07),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>PORTFOLIO & REFLECTIONS</span>
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-none">
              Welcome to <br />
              <span className="text-indigo-600 dark:text-indigo-400 italic">Gordon Pike's Blog.</span>
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Exploring the intersection of enterprise software architecture, intelligent agentic systems, and decoupled digital environments. Deep dives into Adobe Experience Manager (AEM), Progressive Web Apps (PWAs), and the future of enterprise development.
            </p>
            <div className="flex flex-wrap gap-4" id="hero-actions">
              <button
                onClick={() => onNavigate('blog')}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-xs font-bold tracking-wider text-white shadow-md hover:bg-indigo-500 transition-all uppercase"
                id="hero-read-blog-btn"
              >
                Read Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs font-bold tracking-wider text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all uppercase"
                id="hero-learn-more-btn"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero visual representation: High-fidelity layout container */}
          <div className="lg:col-span-5 relative" id="hero-interactive-card">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 opacity-20 blur-lg dark:opacity-30" />
            <div className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="rounded-md bg-slate-100 px-3 py-1 text-[10px] font-mono text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  gordonpike.com/architecture
                </div>
              </div>
              <div className="mt-4 space-y-4 font-mono text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <div>
                  <span className="text-indigo-600 dark:text-indigo-400">const</span> <span className="text-blue-600 dark:text-blue-400">focus</span> = &#123;
                  <div className="pl-4">cms: <span className="text-amber-600 dark:text-amber-500">"Headless AEM (Adobe Experience Manager)"</span>,</div>
                  <div className="pl-4">frontend: <span className="text-amber-600 dark:text-amber-500">"Decoupled React / Next.js / Vite"</span>,</div>
                  <div className="pl-4">ai_systems: <span className="text-amber-600 dark:text-amber-500">"Agentic loops with specialized tools"</span></div>
                  &#125;;
                </div>
                <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                  <span className="text-indigo-600 dark:text-indigo-400">function</span> <span className="text-purple-600 dark:text-purple-400">futureProof</span>(system) &#123;
                  <div className="pl-4">return system</div>
                  <div className="pl-8">.decouplePresentation()</div>
                  <div className="pl-8">.equipWithSkills()</div>
                  <div className="pl-8">.enableOfflineResilience();</div>
                  &#125;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Latest Articles Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-articles">
        <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="font-sans text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              Latest Articles
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
              Read engineering notes on systems, tools, and user experiences.
            </p>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="mt-2 sm:mt-0 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider hover:text-indigo-700 dark:hover:text-indigo-300 uppercase"
            id="all-articles-link"
          >
            View All Articles
            <ChevronRight className="ml-1.5 h-4 w-4" />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8"
          id="latest-articles-grid"
        >
          {ARTICLES.map((article) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              onClick={() => onNavigate('article-detail', article.id)}
              className="group cursor-pointer flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-indigo-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 transition-all duration-300"
              id={`article-card-${article.id}`}
            >
              <div className="aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 space-y-3">
                <span className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                  {article.category}
                </span>
                <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {article.title}
                </h3>
                <p className="line-clamp-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-sans flex-1">
                  {article.summary}
                </p>
                <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-3.5 dark:border-slate-800">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Featured Presentations Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-presentations">
        <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="font-sans text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              Featured Presentations
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
              Talks given at major developer conferences and summits.
            </p>
          </div>
          <button
            onClick={() => onNavigate('presentations')}
            className="mt-2 sm:mt-0 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider hover:text-indigo-700 dark:hover:text-indigo-300 uppercase"
            id="all-presentations-link"
          >
            View All Presentations
            <ChevronRight className="ml-1.5 h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8" id="featured-presentations-grid">
          {PRESENTATIONS.map((presentation) => (
            <div
              key={presentation.id}
              onClick={() => onNavigate('presentation-detail', presentation.id)}
              className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-6 hover:border-indigo-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center"
              id={`presentation-card-${presentation.id}`}
            >
              <div className="w-full md:w-1/3 aspect-4/3 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative">
                <img
                  src={presentation.imageUrl}
                  alt={presentation.title}
                  className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="rounded-full bg-indigo-600 p-3 text-white shadow-md">
                    <Presentation className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-indigo-50 px-2 py-0.5 text-[9px] font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 uppercase border border-indigo-100 dark:border-indigo-900/30">
                    {presentation.event}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {presentation.location}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {presentation.title}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
                  {presentation.description}
                </p>
                <div className="flex items-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  Explore Session Decks
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Newsletter Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-newsletter">
        <NewsletterSignup
          variant="home-banner"
          title="The GordonPike Insider."
          description="Join a selective circle of senior developers, software architects, and tech enthusiasts. Receive strategic analysis on enterprise architectures, emergent AI skill engines, and decoupling tactics once a month. No spam, just pure technical craftsmanship."
          placeholder="Enter your professional email"
          buttonText="Subscribe"
          idPrefix="home-insider"
        />
      </section>
    </div>
  );
}
