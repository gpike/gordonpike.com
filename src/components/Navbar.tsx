import { motion } from 'motion/react';
import { Sun, Moon, Menu, X, Terminal } from 'lucide-react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View, itemId?: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({
  currentView,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen
}: NavbarProps) {
  const navItems: { id: View; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'blog', label: 'BLOG' },
    { id: 'presentations', label: 'PRESENTATIONS' },
    { id: 'about', label: 'ABOUT' }
  ];

  const getActiveTab = () => {
    if (currentView === 'article-detail') return 'blog';
    if (currentView === 'presentation-detail') return 'presentations';
    return currentView;
  };

  const activeTab = getActiveTab();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex cursor-pointer items-center space-x-2.5"
          id="nav-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-md shadow-indigo-100/10 dark:bg-slate-800">
            <Terminal className="h-5 w-5 text-indigo-400" />
          </div>
          <span className="font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            GordonPike<span className="text-indigo-600 dark:text-indigo-400">.</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1" id="nav-desktop">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wider transition-colors duration-200 ${
                  isActive 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center space-x-3" id="nav-utils">
          <button
            onClick={onToggleDarkMode}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors dark:text-slate-400 dark:hover:bg-slate-900"
            aria-label="Toggle dark mode"
            id="theme-toggle-btn"
          >
            <motion.div
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </motion.div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors dark:text-slate-400 dark:hover:bg-slate-900"
            aria-label="Toggle menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-slate-200 bg-white/95 px-4 py-3 shadow-lg dark:border-slate-800 dark:bg-slate-950/95"
          id="mobile-nav-drawer"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-slate-100 text-indigo-600 dark:bg-slate-900 dark:text-indigo-400' 
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </header>
  );
}
