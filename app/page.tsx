
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Building2, ArrowRight, Bell, CheckCircle2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { scholarships } from '../data/scholarships';
import { exams } from '../data/exams';
import { blogPosts } from '../data/blogPosts';

export default function HomePage() {
  const [showReminder, setShowReminder] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [endingSoonExams, setEndingSoonExams] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    
    const filtered = exams
      .filter(e => e.applicationEnd)
      .map(e => {
        const endDate = new Date(e.applicationEnd!);
        const diffTime = endDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...e, daysLeft };
      })
      .filter(e => e.daysLeft >= 0 && e.daysLeft <= 30)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 3);
      
    setEndingSoonExams(filtered);
  }, []);

  const handleSetReminder = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowReminder(true);
    setTimeout(() => setShowReminder(false), 3000);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-pulse" />;
  }

  return (
    <div className="w-full relative">
      <AnimatePresence>
        {showReminder && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            className="fixed top-20 left-0 right-0 mx-auto w-max z-50 bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-full shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-primary-teal" />
            Reminder set successfully
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-teal to-teal-700 py-12 md:py-20 px-4 overflow-hidden text-white">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-6xl font-black mb-6 leading-tight"
          >
            Admissions in Telangana & Andhra <br className="hidden md:block" /> Made Simple.
          </motion.h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            AfterInter is the most trusted education portal for intermediate students in Telangana and Andhra Pradesh. We simplify the chaos of engineering, medical, and professional admissions by aggregating verified data.
          </p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto"
          >
             <Link href="/universities" className="w-full sm:w-auto bg-white text-teal-800 hover:bg-teal-50 px-8 py-4 rounded-2xl font-black text-lg uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 border-2 border-transparent">
               <Building2 className="w-6 h-6" /> Universities
             </Link>
             <Link href="/scholarships" className="w-full sm:w-auto bg-secondary-purple hover:bg-purple-600 text-white px-8 py-4 rounded-2xl font-black text-lg uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 border-2 border-transparent">
               <Award className="w-6 h-6" /> Scholarships
             </Link>
          </motion.div>
        </div>
      </section>

      {/* Deadlines Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex justify-between items-end mb-8">
              <div>
                 <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Upcoming Deadlines</h2>
                 <p className="text-slate-500 font-medium italic">Don't miss these critical dates.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {endingSoonExams.map((exam) => (
                <div key={exam.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exam.name}</h3>
                    <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-1 rounded-full uppercase">{exam.daysLeft} Days Left</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-6 line-clamp-2">{exam.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <Link href={`/exams/${exam.id}`} className="text-primary-teal font-bold flex items-center hover:gap-2 transition-all">
                      Details <ArrowRight size={16} className="ml-1" />
                    </Link>
                    <button onClick={handleSetReminder} className="p-2 rounded-full border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-primary-teal transition-colors">
                      <Bell size={18} />
                    </button>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
