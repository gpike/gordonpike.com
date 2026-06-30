import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, Clock, Filter, Sparkles } from 'lucide-react';
import { Article, View } from '../types';
import { ARTICLES } from '../data';
import NewsletterSignup from './NewsletterSignup';

interface BlogViewProps {
  onNavigate: (view: View, itemId?: string) => void;
}

export default function BlogView({ onNavigate }: BlogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    ARTICLES.forEach((article) => {
      article.tags.forEach((tag) => tags.add(tag.toUpperCase()));
    });
    return ['ALL', ...Array.from(tags)];
  }, []);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === 'ALL' ||
        article.tags.some((t) => t.toUpperCase() === selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12" id="blog-view-container">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 dark:border-slate-800 space-y-4" id="blog-header">
        <span className="text-[11px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase flex items-center">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" /> RECOGNIZING CODE CRAFTSMANSHIP
        </span>
        <h1 className="font-sans text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-none">
          Latest Articles
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Deep structural insights, architecture patterns, and technical guidelines on decoupling systems and building intelligent agentic workflows.
        </p>
      </div>

      {/* Search & Tag Filter Controllers */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between" id="blog-controllers">
        {/* Search Input Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, keywords, topics..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
            id="blog-search-input"
          />
        </div>

        {/* Tags Row Filter */}
        <div className="flex flex-wrap gap-1.5 items-center" id="blog-tags-filter">
          <Filter className="h-4 w-4 text-slate-400 mr-1 hidden sm:block" />
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase transition-all duration-150 ${
                selectedTag === tag
                  ? 'bg-indigo-600 text-white dark:bg-indigo-500 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
              id={`blog-tag-filter-btn-${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid list */}
      <div id="blog-articles-grid-container">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-300 rounded-xl dark:border-slate-800" id="blog-no-results">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">No articles match your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('ALL');
              }}
              className="mt-4 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              id="clear-blog-filters-btn"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                layout
                onClick={() => onNavigate('article-detail', article.id)}
                className="group cursor-pointer flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-indigo-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 transition-all duration-300"
                id={`blog-grid-card-${article.id}`}
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-104"
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
          </div>
        )}
      </div>

      {/* Skewed Newsletter Banner */}
      <NewsletterSignup
        variant="banner"
        title="Engineering Insights, Delivered."
        description="Get technical deep dives, custom blueprints, and structural reviews delivered straight to your inbox monthly. Subscribe below."
        placeholder="you@enterprise.com"
        buttonText="Join"
        idPrefix="blog-insights"
      />
    </div>
  );
}
