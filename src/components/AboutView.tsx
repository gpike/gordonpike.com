import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, ArrowUpRight, Code, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20" id="about-view-container">
      {/* 1. Split Editorial Hero Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about-hero">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            MEET THE ARCHITECT
          </span>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-none">
            Mastering the <br />
            <span className="text-indigo-600 dark:text-indigo-400 italic">Digital Craft.</span>
          </h1>
          <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
            <p>
              I am Gordon Pike, a Principal Architect specializing in building highly resilient, decoupled enterprise marketing platforms and generative AI ecosystems. With over a decade of experience designing and managing Adobe Experience Manager (AEM) setups, I focus on building software that separates authoring concerns from presentation layers.
            </p>
            <p>
              My architectural philosophy revolves around **decoupling**, **deterministic tooling**, and **resilience**. I believe that enterprise content delivery should be lightning-fast, and content authors should have creative independence without compromising system speed, stability, or visual integrity.
            </p>
            <p>
              When I’m not writing schemas, planning APIs, or leading global software teams, I write about emerging paradigms on this blog—sharing blueprints, strategies, and reflections with the larger engineering community.
            </p>
          </div>
        </div>

        {/* Gray Portrait Representation */}
        <div className="lg:col-span-5 relative flex justify-center" id="about-portrait-card">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-indigo-500 to-slate-500 opacity-15 blur-lg dark:opacity-20" />
          <div className="relative aspect-3/4 w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xl dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800"
              alt="Gordon Pike Portrait"
              className="h-full w-full object-cover grayscale contrast-105"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-slate-900/80 backdrop-blur-md p-4 border border-white/10">
              <p className="text-xs font-bold text-white">Gordon Pike</p>
              <p className="text-[10px] font-mono text-slate-400">Principal Architect • Denver, CO</p>
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

        {/* Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bento-philosophy-grid">
          {/* Card 1: Technical Precision */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-zinc-900 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-slate-50">
                Technical Precision
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
                I believe in writing clean, strict, and performant TypeScript. Systems should be deterministic, easily compilable, and guarded by comprehensive schemas to catch architectural drift.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">TYPE SAFETY • ZERO DRIFT</span>
          </div>

          {/* Card 2: AI & Future-Proofing (Dark Accent Card!) */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 dark:bg-slate-950 flex flex-col justify-between space-y-6 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-sans text-lg font-bold text-white">
                AI & Future-Proofing
              </h3>
              <p className="text-xs leading-relaxed text-slate-300 font-sans">
                Large Language Models know everything but can do nothing. By designing specialized agentic skill containers, I empower AI to safely inspect codebases, execute API gateways, and assist developers securely.
              </p>
            </div>
            <span className="relative z-10 text-[10px] font-mono text-indigo-400">AGENTIC SKILLS • DETERMINISTIC CHANNELS</span>
          </div>

          {/* Card 3: Global Leadership */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-zinc-900 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-slate-50">
                Global Leadership
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
                Leading software teams requires empathy, clear engineering goals, and automated workflows. By removing development friction and automating deployments, I help engineering teams do their best work.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">EMPATHY • AUTOMATION</span>
          </div>
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
            <a
              href="https://github.com/gpike"
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
            <a
              href="https://linkedin.com"
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
            <a
              href="https://twitter.com"
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
          </div>
        </div>

        {/* Right column: Quick Inquiry Card */}
        <div className="rounded-xl border border-indigo-500/10 bg-indigo-50/30 dark:bg-slate-900/50 p-6 flex flex-col justify-between space-y-6" id="about-contact-card">
          <div className="space-y-3">
            <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-slate-50">
              Enterprise Advisory
            </h3>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
              Need feedback on decoupling your monolithic content management setups, designing bulletproof PWAs, or integrating conversational LLMs with strict code execution skills? I provide strategic consulting and workshops for engineering teams.
            </p>
          </div>
          <a
            href="mailto:gordon@gordonpike.com"
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
