import React from 'react';
import { Github, Linkedin, Twitter, Terminal } from 'lucide-react';
import { View } from '../types';
import NewsletterSignup from './NewsletterSignup';

interface FooterProps {
  onNavigate: (view: View, itemId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 transition-colors" id="footer-main">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Bio & Brand Info */}
          <div className="space-y-6 xl:col-span-1" id="footer-bio-section">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-white dark:bg-slate-800">
                <Terminal className="h-4 w-4 text-indigo-400" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                GordonPike<span className="text-indigo-600 dark:text-indigo-400">.</span>
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Senior Architect exploring decoupled systems, intelligent agentic workflows, future-proof CMS topologies, and modern web application development.
            </p>
            <div className="flex space-x-4" id="footer-social-icons">
              <a
                href="https://github.com/gpike"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-200 p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-all"
                id="social-github-link"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-200 p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-all"
                id="social-linkedin-link"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-200 p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-all"
                id="social-twitter-link"
              >
                <Twitter className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Navigation and Resources Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0" id="footer-links-section">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-bold tracking-wider text-slate-900 dark:text-slate-100 uppercase">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <button
                      onClick={() => onNavigate('home')}
                      className="text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                      id="footer-nav-home"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('blog')}
                      className="text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                      id="footer-nav-blog"
                    >
                      Blog Articles
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('presentations')}
                      className="text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                      id="footer-nav-presentations"
                    >
                      Presentations
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('about')}
                      className="text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                      id="footer-nav-about"
                    >
                      About Gordon
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 dark:text-slate-100 uppercase">
                  Ecosystem Focus
                </h3>
                <ul className="mt-4 space-y-2.5">
                  <li className="text-sm text-slate-500 dark:text-slate-400">
                    Adobe Experience Manager
                  </li>
                  <li className="text-sm text-slate-500 dark:text-slate-400">
                    Decoupled Frontend Architectures
                  </li>
                  <li className="text-sm text-slate-500 dark:text-slate-400">
                    Agentic AI Tools & Skills
                  </li>
                  <li className="text-sm text-slate-500 dark:text-slate-400">
                    Enterprise Content Sync
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Column */}
            <div id="footer-newsletter-column">
              <NewsletterSignup
                variant="compact"
                title="The Weekly Byte"
                description="Subscribe to receive short, punchy summaries of emergent web architectures and artificial intelligence agents directly in your inbox."
                placeholder="Enter your email"
                idPrefix="weekly-byte"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0" id="footer-bottom">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Gordon Pike. All rights reserved.
          </p>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-600">
            BUILT WITH HIGH-FIDELITY WEB SKILLS • PORT: 3000
          </p>
        </div>
      </div>
    </footer>
  );
}
