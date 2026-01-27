'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Building2, ArrowRight, Bell, CheckCircle2, Compass, ChevronRight, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { scholarships } from '@/data/scholarships';
import { exams } from '@/data/exams';

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

  const alternativeExams = exams.filter(e => e.category === 'Private Engineering' || e.category === 'Skill-Based').slice(0, 5);

  const getDeadlineBadge = (dateStr?: string) => {
    if (!dateStr) return null;
    const endDate = new Date(dateStr);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (days < 0) return null;
    
    if (days <= 3) return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100 mb-1">
        Closes in {days} days
      </span>
    );
    if (days <= 10) return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 mb-1">
        Closes in {days} days
      </span>
    );
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 mb-1">
        Last date: {endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
      </span>
    );
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

          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="mt-10 flex justify-center"
          >
             <Link href="/exam-finder" className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-300 to-yellow-400 text-amber-950 px-6 py-3.5 rounded-full text-sm md:text-base font-black shadow-[0_10px_30px_-10px_rgba(251,191,36,0.5)] hover:shadow-[0_10px_40px_-10px_rgba(251,191,36,0.7)] hover:scale-105 transition-all duration-300 border border-yellow-200/50">
               <span className="absolute -top-2.5 -right-2 bg-white text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-amber-100 animate-bounce">
                  AI Tool
               </span>
               <div className="bg-white/30 p-1.5 rounded-full group-hover:bg-white/50 transition-colors">
                  <Compass size={18} className="shrink-0" />
               </div>
               <span>Confused? Find the right exam for you</span>
               <ChevronRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform" />
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

      {/* Exams Beyond EAMCET */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950 overflow-hidden border-t border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto pl-4 pr-0 md:px-4">
            <div className="flex justify-between items-end mb-6 pr-4">
               <div>
                  <h2 className="text-2xl md:text-3xl font-black mb-1">Exams Beyond EAMCET</h2>
                  <p className="text-slate-500 text-sm font-medium">Top colleges also accept these entrance exams.</p>
               </div>
               <Link href="/exams" className="text-slate-400 hover:text-slate-600 font-bold text-xs flex items-center">
                  View All <ChevronRight size={14} />
               </Link>
            </div>

            <div className="overflow-x-auto no-scrollbar pb-8 -ml-4 pl-4 snap-x snap-mandatory">
               <div className="flex gap-4 w-max">
                  {alternativeExams.map((exam) => (
                     <motion.div 
                        key={exam.id}
                        whileTap={{ scale: 0.98 }}
                        className="snap-center w-72 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                     >
                        <div>
                           <div className="flex justify-between items-start mb-2">
                              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                                 <GraduationCap size={20} />
                              </div>
                              <div className="flex flex-col items-end">
                                {getDeadlineBadge(exam.applicationEnd)}
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-slate-500">{exam.level} Exam</span>
                              </div>
                           </div>
                           
                           <h3 className="font-black text-lg leading-tight mb-1 truncate">{exam.name}</h3>
                           <p className="text-xs text-slate-400 truncate mb-1">{exam.fullName}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                           <Link 
                              href={`/exams/${exam.id}`}
                              className="py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs text-center hover:opacity-90 transition-opacity shadow-sm"
                           >
                              Details
                           </Link>
                           <Link 
                              href={`/universities?q=${encodeURIComponent(exam.name)}`}
                              className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                           >
                              Colleges
                           </Link>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Scholarships Section */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-black mb-2">Scholarships closing soon</h2>
              <p className="text-slate-500 font-medium text-sm md:text-base">Don't miss the deadline for these official schemes.</p>
            </div>
            <Link href="/scholarships" className="text-secondary-purple font-black flex items-center hover:underline group text-xs md:text-base">
              See All <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.slice(0, 2).map((scholar) => (
              <div key={scholar.id} className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all group">
                <div className="bg-white dark:bg-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border dark:border-slate-600 text-secondary-purple group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-black group-hover:text-secondary-purple transition-colors leading-tight line-clamp-2">{scholar.name}</h3>
                  </div>
                  <span className={`self-start px-3 py-1 mb-4 rounded-full text-[10px] font-black uppercase tracking-widest ${scholar.type === 'State' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {scholar.type} Funding
                  </span>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed">{scholar.eligibility.substring(0, 90)}...</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">Ends: {scholar.deadline}</div>
                    <Link href={`/scholarships/${scholar.id}`} className="text-secondary-purple font-black flex items-center text-xs uppercase tracking-widest hover:translate-x-1 transition-transform">
                      Check Eligibility <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto bg-primary-teal rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center text-white shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-5xl font-black mb-4">Start your journey with confidence.</h2>
            <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto font-medium">We gather data from verified government sources so you can make the right decision for your future.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link href="/universities" className="w-full sm:w-auto bg-white text-primary-teal px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1">
                 Browse Colleges
               </Link>
               <Link href="/help" className="w-full sm:w-auto bg-teal-800 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-teal-900 transition-all shadow-xl hover:-translate-y-1">
                 Ask AI Advisor
               </Link>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl"></div>
        </div>
      </section>
    </div>
  );
}