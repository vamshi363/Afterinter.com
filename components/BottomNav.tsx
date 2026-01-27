'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, GraduationCap, FileText, BookOpen, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const pathname = usePathname();

  const shouldHide = 
    (pathname?.startsWith('/universities/') && pathname !== '/universities') ||
    (pathname?.startsWith('/exams/') && pathname !== '/exams') ||
    (pathname?.startsWith('/blog/') && pathname !== '/blog');

  if (shouldHide) return null;

  const tabs = [
    { name: 'Home', path: '/', icon: <Home size={24} />, activeColor: 'text-primary-teal' },
    { name: 'Colleges', path: '/universities', icon: <GraduationCap size={24} />, activeColor: 'text-primary-teal' },
    { name: 'Exams', path: '/exams', icon: <FileText size={24} />, activeColor: 'text-blue-500' },
    { name: 'Blog', path: '/blog', icon: <BookOpen size={24} />, activeColor: 'text-secondary-purple' },
    { name: 'Tools', path: '/tools', icon: <LayoutGrid size={24} />, activeColor: 'text-orange-500' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pb-safe md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center h-[60px] px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || (tab.path !== '/' && pathname?.startsWith(tab.path));
          
          return (
            <Link 
              key={tab.name} 
              href={tab.path}
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

export default BottomNav;