import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Calculator, Home, Star, FileText, Gift, LayoutGrid, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Navbar Component
const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
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
    window.addEventListener('favorites-updated', updateCount);
    return () => window.removeEventListener('favorites-updated', updateCount);
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/universities?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Universities', path: '/universities', icon: <GraduationCap size={18} /> },
    { name: 'Exams', path: '/exams', icon: <FileText size={18} /> },
    { name: 'Scholarships', path: '/scholarships', icon: <Gift size={18} /> },
    { name: 'Tools', path: '/tools', icon: <Calculator size={18} /> },
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
                  <Link to="/" className="flex items-center space-x-2 shrink-0">
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
                        to={link.path}
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
                       to="/saved" 
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
                     
                     <Link to="/login" className="hidden md:block bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 px-5 py-2 rounded-full font-bold text-sm transition-all ml-2">
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

// BottomNav Component
const BottomNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const shouldHide = 
    (pathname.startsWith('/universities/') && pathname !== '/universities') ||
    (pathname.startsWith('/exams/') && pathname !== '/exams');

  if (shouldHide) return null;

  const tabs = [
    { name: 'Home', path: '/', icon: <Home size={24} />, activeColor: 'text-primary-teal' },
    { name: 'Colleges', path: '/universities', icon: <GraduationCap size={24} />, activeColor: 'text-primary-teal' },
    { name: 'Exams', path: '/exams', icon: <FileText size={24} />, activeColor: 'text-blue-500' },
    { name: 'Scholarships', path: '/scholarships', icon: <Gift size={24} />, activeColor: 'text-secondary-purple' },
    { name: 'Tools', path: '/tools', icon: <LayoutGrid size={24} />, activeColor: 'text-orange-500' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pb-safe md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center h-[60px] px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || (tab.path !== '/' && pathname.startsWith(tab.path));
          
          return (
            <Link 
              key={tab.name} 
              to={tab.path}
              className={`flex-1 flex flex-col items-center justify-center h-full space-y-1 relative active:scale-90 transition-transform ${isActive ? tab.activeColor : 'text-slate-400 dark:text-slate-500'}`}
            >
              <div className="relative">
                {React.cloneElement(tab.icon as React.ReactElement, { 
                  fill: isActive ? 'currentColor' : 'none',
                  strokeWidth: isActive ? 2.5 : 2,
                  className: `transition-all duration-300 ${isActive ? 'drop-shadow-sm scale-110' : ''}`
                })}
              </div>
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'font-bold' : ''}`}>
                {tab.name}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="bottomNavIndicator"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-current"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="mt-auto border-t py-12 bg-slate-900 border-slate-800 text-slate-400 mb-20 md:mb-0">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-primary-teal p-1 rounded text-white">
            <GraduationCap size={20} />
          </div>
          <span className="font-bold text-lg text-white">After Inter</span>
        </div>
        <p className="text-sm">Empowering students in Telangana and Andhra Pradesh with verified education discovery tools.</p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/universities" className="hover:text-primary-teal">Universities</Link></li>
          <li><Link to="/exams" className="hover:text-primary-teal">Entrance Exams</Link></li>
          <li><Link to="/scholarships" className="hover:text-primary-teal">Scholarships</Link></li>
          <li><Link to="/saved" className="hover:text-primary-teal">My Saved List</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/privacy" className="hover:text-primary-teal">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-primary-teal">Terms & Conditions</Link></li>
          <li><Link to="/disclaimer" className="hover:text-primary-teal">Disclaimer</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Contact</h4>
        <ul className="space-y-2 text-sm">
          <li>Email: support@afterinter.com</li>
          <li>Location: Hyderabad / Vijayawada</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-slate-800 text-center text-xs">
      © 2025 After Inter. Official University & Scholarship Websites Only.
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};