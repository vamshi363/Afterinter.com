'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GraduationCap, Home, Star, FileText, Gift, LayoutGrid, Search, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [savedCount, setSavedCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateCount = () => {
      if (typeof window !== 'undefined') {
        const saved = JSON.parse(localStorage.getItem('tsap_saved_unis') || '[]');
        setSavedCount(saved.length);
      }
    };
    updateCount();
    if (typeof window !== 'undefined') {
      window.addEventListener('favorites-updated', updateCount);
      return () => window.removeEventListener('favorites-updated', updateCount);
    }
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/universities?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Universities', path: '/universities', icon: <GraduationCap size={18} /> },
    { name: 'Exams', path: '/exams', icon: <FileText size={18} /> },
    { name: 'Scholarships', path: '/scholarships', icon: <Gift size={18} /> },
    { name: 'Blog', path: '/blog', icon: <BookOpen size={18} /> },
    { name: 'Tools', path: '/tools', icon: <LayoutGrid size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b transition-colors duration-300 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              <motion.div 
                key="nav-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex justify-between items-center"
              >
                <Link href="/" className="flex items-center space-x-2 shrink-0">
                  <div className="bg-primary-teal p-1.5 rounded-lg text-white">
                    <GraduationCap size={24} />
                  </div>
                  <span className="font-bold text-lg md:text-xl tracking-tight leading-none">
                    After <span className="text-primary-teal">Inter</span>
                  </span>
                </Link>

                <div className="hidden md:flex space-x-6 items-center">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`flex items-center space-x-1 font-medium transition-colors hover:text-primary-teal ${pathname === link.path ? 'text-primary-teal' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                   <button 
                     onClick={() => setIsSearchOpen(true)}
                     className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 hover:text-primary-teal"
                     aria-label="Open Search"
                   >
                     <Search size={24} strokeWidth={2} />
                   </button>

                   <Link 
                     href="/saved" 
                     className="relative p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" 
                     title="Saved Colleges"
                   >
                     <Star size={24} className="text-slate-600 dark:text-slate-400 group-hover:text-yellow-500 transition-colors" strokeWidth={2} />
                     {savedCount > 0 && (
                       <span className="absolute top-1 right-0 bg-yellow-500 text-white text-[10px] font-bold h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950 shadow-sm">
                         {savedCount}
                       </span>
                     )}
                   </Link>
                   
                   <Link href="/login" className="hidden md:block bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 px-5 py-2 rounded-full font-bold text-sm transition-all ml-2">
                     Login
                   </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="search-bar"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full flex items-center space-x-4"
              >
                 <form onSubmit={handleSearchSubmit} className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      ref={inputRef}
                      type="text" 
                      placeholder="Search colleges, exams, scholarships..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-full focus:ring-2 focus:ring-primary-teal outline-none font-medium text-slate-900 dark:text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </form>
                 <button 
                   onClick={() => setIsSearchOpen(false)} 
                   className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500"
                 >
                   <X size={24} />
                 </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;