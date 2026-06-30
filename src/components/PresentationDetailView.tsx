import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, ArrowRight, ArrowLeftSquare, ArrowRightSquare, Play, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { Presentation, View } from '../types';
import { PRESENTATIONS } from '../data';

interface PresentationDetailViewProps {
  presentation: Presentation;
  onBack: () => void;
  onNavigate: (view: View, itemId?: string) => void;
}

export default function PresentationDetailView({ presentation, onBack, onNavigate }: PresentationDetailViewProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [downloadedResName, setDownloadedResName] = useState<string | null>(null);

  const handleNextSlide = () => {
    if (currentSlideIndex < presentation.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleDownload = (resName: string) => {
    setDownloadedResName(resName);
    setTimeout(() => {
      setDownloadedResName(null);
    }, 2500);
  };

  // Find related presentations
  const relatedPresentations = PRESENTATIONS.filter(p => p.id !== presentation.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12" id="presentation-detail-container">
      {/* Breadcrumbs and back button */}
      <div className="space-y-4" id="presentation-detail-header">
        <button
          onClick={onBack}
          className="group inline-flex items-center text-xs font-bold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider"
          id="presentation-back-btn"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Presentations
        </button>

        <nav className="flex text-[10px] font-mono text-slate-400 uppercase tracking-wider" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-1.5">
            <li>
              <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => onNavigate('presentations')}>Presentations</span>
            </li>
            <li>/</li>
            <li className="text-slate-500 font-semibold">{presentation.event}</li>
          </ol>
        </nav>
      </div>

      {/* Meta header block */}
      <div className="space-y-4" id="presentation-meta-block">
        <h1 className="font-sans text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          {presentation.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-slate-400 font-mono">
          <div className="flex items-center">
            <MapPin className="mr-1.5 h-3.5 w-3.5" />
            <span>{presentation.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            <span>{presentation.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            <span>{presentation.duration}</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Interactive Player Left, Resource panel Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="presentation-player-layout">
        {/* Left Column: Interactive Slides or Video Player */}
        <div className="lg:col-span-8 flex flex-col" id="presentation-player-col">
          {isPlayingVideo ? (
            <div className="aspect-video w-full rounded-xl bg-black relative flex flex-col items-center justify-center p-6 border border-slate-800" id="video-mock-player">
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400">SESSION RECORDING</span>
              </div>
              <button
                onClick={() => setIsPlayingVideo(false)}
                className="absolute top-4 right-4 text-xs font-mono text-slate-400 hover:text-white"
              >
                Close Player
              </button>
              <div className="text-center space-y-4">
                <Play className="h-12 w-12 text-indigo-500 mx-auto animate-bounce" />
                <p className="text-sm font-medium text-slate-300">Streaming: "{presentation.title}"</p>
                <p className="text-[10px] font-mono text-slate-500">Video source: Evolve Event Media Server (Mock Sandbox Player)</p>
              </div>
            </div>
          ) : (
            /* Interactive slide deck player */
            <div className="rounded-xl border border-slate-200 bg-slate-900 text-white shadow-xl flex-1 flex flex-col justify-between dark:border-slate-800 overflow-hidden" id="slide-deck-player">
              {/* Slide top header bar */}
              <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                  INTERACTIVE DECK PLAYER
                </span>
                <span className="text-[10px] font-mono text-indigo-400 font-bold">
                  SLIDE {currentSlideIndex + 1} OF {presentation.slides.length}
                </span>
              </div>

              {/* Slide central display stage */}
              <div className="p-8 sm:p-12 flex-1 flex flex-col justify-center min-h-[280px]">
                <div className="space-y-6">
                  {/* Category label */}
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
                    {presentation.slides[currentSlideIndex].title}
                  </span>
                  {/* Central assertion message */}
                  <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                    {presentation.slides[currentSlideIndex].content}
                  </h3>
                  {/* Slide Bullet points list */}
                  <ul className="space-y-2.5 pl-1">
                    {presentation.slides[currentSlideIndex].bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-300 font-sans">
                        <span className="text-indigo-400 mr-2.5 mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Slide deck controller bar */}
              <div className="bg-slate-950/80 px-4 py-3.5 border-t border-slate-800 flex items-center justify-between">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={handlePrevSlide}
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                  id="slide-prev-btn"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                {/* Progress dot indicators */}
                <div className="flex space-x-1.5">
                  {presentation.slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        idx === currentSlideIndex ? 'w-4 bg-indigo-500' : 'w-1.5 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={currentSlideIndex === presentation.slides.length - 1}
                  onClick={handleNextSlide}
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                  id="slide-next-btn"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Download & Meta Panels */}
        <div className="lg:col-span-4 flex flex-col gap-6" id="presentation-sidebar-col">
          {/* Watch & Download card */}
          <div className="rounded-xl border border-slate-200 p-6 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-slate-50">
                Session Resources
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                Access official materials and collateral related to Gordon Pike's conference lecture session.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setIsPlayingVideo(true)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:border-indigo-500 hover:bg-indigo-50/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 transition-all text-xs font-medium text-slate-700 dark:text-slate-300"
                id="watch-recording-btn"
              >
                <div className="flex items-center space-x-2.5">
                  <Play className="h-4 w-4 text-indigo-500 fill-indigo-500" />
                  <span>Watch Recording</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {presentation.resources.map((resource) => (
                <button
                  key={resource.name}
                  onClick={() => handleDownload(resource.name)}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:border-indigo-500 hover:bg-indigo-50/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 transition-all text-xs font-medium text-slate-700 dark:text-slate-300"
                  id={`resource-${resource.type}`}
                >
                  <div className="flex items-center space-x-2.5">
                    {resource.type === 'pdf' ? (
                      <FileText className="h-4 w-4 text-blue-500" />
                    ) : (
                      <ExternalLink className="h-4 w-4 text-slate-500" />
                    )}
                    <span>{resource.name}</span>
                  </div>
                  <Download className="h-3.5 w-3.5 text-slate-400" />
                </button>
              ))}

              {downloadedResName && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-[11px] text-emerald-700 border border-emerald-100 flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Downloaded {downloadedResName}!</span>
                </div>
              )}
            </div>

            {/* Session Track Tag Details */}
            <div className="border-t border-slate-100 pt-4 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>SESSION ID:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">G-P240-{presentation.id.slice(0, 3).toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>AUDIENCE LEVEL:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">ADVANCED / SENIOR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abstract and takeaways block */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-6" id="presentation-abstract-details">
        {/* Left Side abstract details */}
        <div className="md:col-span-8 space-y-6">
          <h2 className="font-sans text-2xl font-bold text-slate-900 dark:text-slate-50 border-b border-slate-100 pb-3 dark:border-slate-800">
            Session Abstract
          </h2>
          <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 space-y-4 font-sans">
            <p>
              In this session, we investigate the core paradigms required to modernize Adobe Experience Manager deployments. As enterprise systems demand lower latencies and multi-channel content syndication, continuing with monolithic templates creates severe operational bottlenecks.
            </p>
            <p>
              We cover how to migrate to decoupled environments using Content Fragments and highly optimized GraphQL API gateways. We also detail dispatch caching strategies, edge networking architectures, and secure pathways to transition safely to AEM as a Cloud Service without disrupting existing authoring operations.
            </p>
          </div>
        </div>

        {/* Right Side key takeaways list */}
        <div className="md:col-span-4 space-y-6">
          <h2 className="font-sans text-2xl font-bold text-slate-900 dark:text-slate-50 border-b border-slate-100 pb-3 dark:border-slate-800">
            Key Takeaways
          </h2>
          <ul className="space-y-4">
            {presentation.takeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
                <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related presentations list */}
      <section className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-8" id="related-presentations-section">
        <h3 className="font-sans text-2xl font-bold text-slate-900 dark:text-slate-50">
          Related Sessions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {relatedPresentations.map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate('presentation-detail', p.id)}
              className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 hover:border-indigo-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 flex flex-col md:flex-row gap-5 items-center"
              id={`related-card-${p.id}`}
            >
              <div className="w-full md:w-1/4 aspect-video rounded overflow-hidden bg-slate-100 flex-shrink-0 relative">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{p.event}</span>
                <h4 className="font-sans text-sm font-bold text-slate-900 dark:text-slate-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
