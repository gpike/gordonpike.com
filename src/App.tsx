import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { View } from './types';
import { ARTICLES, PRESENTATIONS } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import BlogView from './components/BlogView';
import PresentationsView from './components/PresentationsView';
import AboutView from './components/AboutView';
import ArticleDetailView from './components/ArticleDetailView';
import PresentationDetailView from './components/PresentationDetailView';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Default to light theme, but inspect localStorage for overrides
    const saved = localStorage.getItem('gordonpike-theme');
    return saved === 'dark';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync theme with document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('gordonpike-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('gordonpike-theme', 'light');
    }
  }, [darkMode]);

  // Scroll to top on navigation action
  const handleNavigate = (view: View, itemId?: string) => {
    setCurrentView(view);
    if (itemId) {
      setSelectedItemId(itemId);
    } else {
      setSelectedItemId(null);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const activeArticle = ARTICLES.find((a) => a.id === selectedItemId);
  const activePresentation = PRESENTATIONS.find((p) => p.id === selectedItemId);

  // Router matching helper
  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogView onNavigate={handleNavigate} />;
      case 'presentations':
        return <PresentationsView onNavigate={handleNavigate} />;
      case 'about':
        return <AboutView />;
      case 'article-detail':
        if (activeArticle) {
          return (
            <ArticleDetailView
              article={activeArticle}
              onBack={() => handleNavigate('blog')}
            />
          );
        }
        return <BlogView onNavigate={handleNavigate} />;
      case 'presentation-detail':
        if (activePresentation) {
          return (
            <PresentationDetailView
              presentation={activePresentation}
              onBack={() => handleNavigate('presentations')}
              onNavigate={handleNavigate}
            />
          );
        }
        return <PresentationsView onNavigate={handleNavigate} />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300" id="app-root">
      {/* 1. Header Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. Main Content viewport */}
      <main className="flex-grow relative" id="app-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (selectedItemId || '')}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
