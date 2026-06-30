import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, ArrowUpRight, Code, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { ABOUT_PROFILE } from '../data';

export default function AboutView() {
  const { name, image, tagline, bioParagraphs, socialLinks, skills } = ABOUT_PROFILE;
  const [para1, para2, para3] = bioParagraphs;
  const focusGroups = [skills.slice(0, 4), skills.slice(4, 8), skills.slice(8, 12)].filter((group) => group.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20" id="about-view-container">
      {/* 1. Split Editorial Hero Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about-hero">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            MEET THE ARCHITECT
          </span>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-none">
            {name.split(' ').slice(0, -1).join(' ') || name} <br />
            <span className="text-indigo-600 dark:text-indigo-400 italic">{name.split(' ').slice(-1)[0] || tagline}</span>
          </h1>
          <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
            <p>{tagline}</p>
            {para1 && <p>{para1}</p>}
            {para2 && <p>{para2}</p>}
            {para3 && <p>{para3}</p>}
          </div>
        </div>

        {/* Gray Portrait Representation */}
        <div className="lg:col-span-5 relative flex justify-center" id="about-portrait-card">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-indigo-500 to-slate-500 opacity-15 blur-lg dark:opacity-20" />
          <div className="relative aspect-3/4 w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xl dark:border-slate-800">
            <img
              src={image}
              alt={`${name} Portrait`}
              className="h-full w-full object-cover grayscale contrast-105"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-slate-900/80 backdrop-blur-md p-4 border border-white/10">
              <p className="text-xs font-bold text-white">{name}</p>
              <p className="text-[10px] font-mono text-slate-400">Senior Architect</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bento Philosophy Grid Section */}
      <section className="space-y-8" id="about-philosophy">
        <div className="border-b border-slate-200 pb-5 dark:border-slate-800 space-y-1">
          <h2 className="font-sans text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            Core Focus Areas
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
            The fundamental pillars driving my engineering and design choices.
          </p>
        </div>

        {/* Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bento-philosophy-grid">
          {focusGroups.map((group, index) => (
            <div
              key={`focus-group-${index}`}
              className={`rounded-xl p-6 flex flex-col justify-between space-y-6 transition-shadow hover:shadow-md ${
                index === 1
                  ? 'border border-slate-800 bg-slate-900 dark:bg-slate-950 relative overflow-hidden shadow-md hover:shadow-lg'
                  : 'border border-slate-200 bg-white dark:border-slate-800 dark:bg-zinc-900'
              }`}
            >
              {index === 1 && <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />}
              <div className={`space-y-4 ${index === 1 ? 'relative z-10' : ''}`}>
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${index === 1 ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400'}`}>
                  {index === 0 ? <Code className="h-5 w-5" /> : index === 1 ? <Cpu className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                </div>
                <h3 className={`font-sans text-lg font-bold ${index === 1 ? 'text-white' : 'text-slate-900 dark:text-slate-50'}`}>
                  {group[0]}
                </h3>
                <p className={`text-xs leading-relaxed font-sans ${index === 1 ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
                  {group.join(' • ')}
                </p>
              </div>
              <span className={`text-[10px] font-mono ${index === 1 ? 'relative z-10 text-indigo-400' : 'text-slate-400'}`}>
                CONTENT-DRIVEN PROFILE
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Connect & Inquiries Block */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" id="about-connect">
        {/* Left column: Social lists */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-zinc-900 space-y-4 flex flex-col justify-between" id="about-social-list">
          <div className="space-y-1.5">
            <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-slate-50">
              Let's Connect
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Find my work, read quick thoughts, or send a message on these networks.
            </p>
          </div>

          <div className="space-y-2">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/20 dark:border-slate-800 dark:hover:border-indigo-500/30 transition-all text-xs font-medium text-slate-700 dark:text-slate-300"
                id="about-github"
              >
                <div className="flex items-center space-x-2.5">
                  <Github className="h-4.5 w-4.5" />
                  <span>GitHub Profile</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/20 dark:border-slate-800 dark:hover:border-indigo-500/30 transition-all text-xs font-medium text-slate-700 dark:text-slate-300"
                id="about-linkedin"
              >
                <div className="flex items-center space-x-2.5">
                  <Linkedin className="h-4.5 w-4.5" />
                  <span>LinkedIn Network</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/20 dark:border-slate-800 dark:hover:border-indigo-500/30 transition-all text-xs font-medium text-slate-700 dark:text-slate-300"
                id="about-twitter"
              >
                <div className="flex items-center space-x-2.5">
                  <Twitter className="h-4.5 w-4.5" />
                  <span>Twitter / X Feed</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </a>
            )}
          </div>
        </div>

        {/* Right column: Quick Inquiry Card */}
        <div className="rounded-xl border border-indigo-500/10 bg-indigo-50/30 dark:bg-slate-900/50 p-6 flex flex-col justify-between space-y-6" id="about-contact-card">
          <div className="space-y-3">
            <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-slate-50">
              Enterprise Advisory
            </h3>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
              {para2 || para1 || tagline}
            </p>
          </div>
          <a
            href={`mailto:${socialLinks.email || 'gopike@gmail.com'}`}
            className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-xs font-bold tracking-wider text-white shadow-md hover:bg-indigo-500 transition-all uppercase"
          >
            Schedule Brief Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
