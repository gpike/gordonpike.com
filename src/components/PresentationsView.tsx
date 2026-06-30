import { motion } from 'motion/react';
import { Presentation, MapPin, Calendar, Clock, Sparkles, Play, ArrowRight } from 'lucide-react';
import { Presentation as PresentationType, View } from '../types';
import { ABOUT_PROFILE, PRESENTATIONS } from '../data';

interface PresentationsViewProps {
  onNavigate: (view: View, itemId?: string) => void;
}

export default function PresentationsView({ onNavigate }: PresentationsViewProps) {
  const speakerName = ABOUT_PROFILE.name;
  const speakerEmail = ABOUT_PROFILE.socialLinks.email || 'gopike@gmail.com';

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12" id="presentations-view-container">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 dark:border-slate-800 space-y-4" id="presentations-header">
        <span className="text-[11px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase flex items-center">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" /> RECOGNIZING CODE CRAFTSMANSHIP
        </span>
        <h1 className="font-sans text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-none">
          Featured Presentations
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed font-normal">
          Explore slides, design system wireframes, architecture maps, and video recordings from Gordon Pike's technical presentations given globally.
        </p>
      </div>

      {/* Grid of Presentations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="presentations-grid">
        {PRESENTATIONS.map((presentation, index) => (
          <motion.div
            key={presentation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            onClick={() => onNavigate('presentation-detail', presentation.id)}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-indigo-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 flex flex-col"
            id={`presentations-grid-card-${presentation.id}`}
          >
            {/* Presentation Thumbnail */}
            <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
              <img
                src={presentation.imageUrl}
                alt={presentation.title}
                className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="rounded-full bg-indigo-600 p-4 text-white shadow-lg flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="h-6 w-6 fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-white tracking-wider uppercase">
                {presentation.event}
              </div>
            </div>

            {/* Presentation Info Content */}
            <div className="flex-1 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-slate-500 font-mono">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3.5 w-3.5 text-slate-400" />
                    <span>{presentation.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3.5 w-3.5 text-slate-400" />
                    <span>{presentation.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5 text-slate-400" />
                    <span>{presentation.duration}</span>
                  </div>
                </div>

                <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-slate-50 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {presentation.title}
                </h3>

                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
                  {presentation.description}
                </p>
              </div>

              {/* Tags & Action Row */}
              <div className="border-t border-slate-100 pt-4 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {presentation.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex-shrink-0 flex items-center text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform">
                  Explore Decks
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inline CTA section */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-8 dark:bg-zinc-900/50 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6" id="presentations-cta">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-slate-50">
            Want {speakerName} to speak at your event?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-xl">
            {speakerName} regularly shares insights on headless Adobe Experience Manager setups, decoupling topologies, and agentic LLM skills at enterprise conferences and technical summits.
          </p>
        </div>
        <a
          href={`mailto:${speakerEmail}`}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-xs font-bold tracking-wider text-white shadow-md hover:bg-indigo-500 transition-all uppercase"
          id="presentations-contact-btn"
        >
          Inquire / Book Speaker
        </a>
      </section>
    </div>
  );
}
