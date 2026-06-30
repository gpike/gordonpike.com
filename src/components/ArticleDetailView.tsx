import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Twitter, Link, Check, Send, Sparkles } from 'lucide-react';
import { Article, View } from '../types';

interface ArticleDetailViewProps {
  article: Article;
  onBack: () => void;
}

interface MockComment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export default function ArticleDetailView({ article, onBack }: ArticleDetailViewProps) {
  const [copied, setCopied] = useState(false);
  const [codeCopiedIndex, setCodeCopiedIndex] = useState<number | null>(null);
  const [comments, setComments] = useState<MockComment[]>([
    {
      id: '1',
      author: 'Sarah Chen',
      content: 'Using standard schemas for tool definitions is indeed a game-changer. It makes the transition between core models so clean. Excellent article!',
      date: 'July 25, 2024'
    },
    {
      id: '2',
      author: 'Marcus Brody',
      content: 'The Cousin Eddie comparison is perfect! Hilarious but so incredibly true of vanilla models.',
      date: 'July 26, 2024'
    }
  ]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out "${article.title}" by ${article.author.name}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCodeCopiedIndex(index);
    setTimeout(() => setCodeCopiedIndex(null), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: MockComment = {
      id: Date.now().toString(),
      author: commentName,
      content: commentText,
      date: 'Just now'
    };

    setComments([...comments, newComment]);
    setCommentName('');
    setCommentText('');
  };

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12" id="article-detail-container">
      {/* Back Button & Metadata */}
      <div className="space-y-6" id="article-meta-header">
        <button
          onClick={onBack}
          className="group inline-flex items-center text-xs font-bold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider"
          id="article-back-btn"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </button>

        <div className="space-y-4">
          <span className="inline-flex rounded bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-[10px] font-bold tracking-wider text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 uppercase">
            {article.category}
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-slate-400 font-mono">
            <div className="flex items-center">
              <Calendar className="mr-1.5 h-3.5 w-3.5" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1.5 h-3.5 w-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner Image */}
      <div className="aspect-21/9 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800" id="article-hero-image">
        <img
          src={article.image}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Post content and sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="article-content-body-grid">
        {/* Sidebar Left: Author Meta info & Sharing */}
        <aside className="lg:col-span-3 space-y-8" id="article-sidebar">
          {/* Author info card */}
          <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-10 w-10 rounded-full object-cover border border-indigo-500/10"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-50">{article.author.name}</p>
                <p className="text-[10px] font-mono text-slate-400">{article.author.role}</p>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
              {article.author.bio}
            </p>
          </div>

          {/* Social share widget */}
          <div className="space-y-3" id="social-share-widget">
            <h4 className="text-[10px] font-bold tracking-widest text-slate-900 dark:text-slate-100 uppercase">
              Share Article
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-indigo-400 transition-all cursor-pointer inline-flex items-center justify-center"
                title="Copy link"
                id="share-btn-copy"
              >
                {copied ? <Check className="h-4 w-4 text-indigo-500" /> : <Link className="h-4 w-4" />}
                {copied && <span className="ml-1.5 text-[10px] font-medium text-indigo-600 dark:text-indigo-400">Copied!</span>}
              </button>
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-indigo-400 transition-all inline-flex items-center justify-center"
                title="Share on LinkedIn"
                id="share-btn-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-indigo-400 transition-all inline-flex items-center justify-center"
                title="Share on Twitter / X"
                id="share-btn-twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </aside>

        {/* Content body right */}
        <section className="lg:col-span-9 space-y-8" id="article-body">
          {/* Formatted Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 font-sans text-sm sm:text-base leading-relaxed space-y-6">
            {/* Split paragraph manually to apply dropcap to first letter of first paragraph */}
            <p>
              <span className="float-left mr-3 font-sans text-5xl sm:text-6xl font-black text-indigo-600 dark:text-indigo-400 leading-[0.8] mt-1">W</span>
              {article.content.split('\n\n')[0].replace(/^\s*#*\s*/, '').replace(/^Imagine/, 'Imagine')}
            </p>

            {/* Rest of paragraphs parsed cleanly */}
            {article.content.split('\n\n').slice(1).map((paragraph, i) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={i} className="font-sans text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              if (paragraph.startsWith('>')) {
                return (
                  <blockquote key={i} className="border-l-4 border-indigo-500 pl-6 my-6 font-sans text-base sm:text-lg italic text-slate-900 dark:text-slate-100 leading-relaxed bg-slate-50 dark:bg-slate-900 py-4 pr-4 rounded-r-lg">
                    {paragraph.replace('>', '').replace(/"/g, '').trim()}
                  </blockquote>
                );
              }
              if (paragraph.startsWith('`')) {
                // Code block extraction
                const lines = paragraph.replace(/```[a-z]*/g, '').replace(/```/g, '').trim();
                return (
                  <div key={i} className="relative rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 font-mono text-xs overflow-x-auto leading-relaxed text-slate-800 dark:text-slate-200 my-4 shadow-inner" id="article-code-block">
                    <pre>{lines}</pre>
                    <button
                      onClick={() => handleCopyCode(lines, i)}
                      className="absolute top-2.5 right-2.5 rounded bg-white border border-slate-200 px-2 py-1 text-[10px] font-sans hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors"
                    >
                      {codeCopiedIndex === i ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                );
              }
              if (paragraph.startsWith('*')) {
                // List of items
                const listItems = paragraph.split('\n').map(li => li.replace(/^\s*\*\s*/, '').trim());
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 my-4">
                    {listItems.map((item, idx) => (
                      <li key={idx} className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Core Tags List */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-slate-800" id="article-tags">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400 uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Comments Section */}
          <section className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-8" id="article-comments">
            <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-indigo-500" />
              Comments ({comments.length})
            </h3>

            {/* Existing Comments list */}
            <div className="space-y-4" id="comments-list">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-lg border border-slate-200 p-5 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-950 dark:text-slate-50">{comment.author}</span>
                    <span className="text-[10px] font-mono text-slate-400">{comment.date}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Write a comment form */}
            <form onSubmit={handlePostComment} className="rounded-lg border border-indigo-500/15 bg-indigo-50/10 p-5 dark:bg-slate-900/50 space-y-4" id="post-comment-form">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Leave a comment
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
                  id="comment-name-input"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Share your thoughts on agentic loops or custom skills..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-zinc-900 dark:text-slate-100 dark:placeholder-slate-500"
                  id="comment-text-textarea"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold tracking-wider text-white hover:bg-indigo-500 transition-colors uppercase"
                id="comment-submit-btn"
              >
                Post Comment
                <Send className="ml-2 h-3.5 w-3.5" />
              </button>
            </form>
          </section>
        </section>
      </div>
    </article>
  );
}
