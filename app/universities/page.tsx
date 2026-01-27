'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { universities } from '../../data/universities';
import { Search, Filter, X, ChevronDown, Info, Scale, ArrowRight } from 'lucide-react';
import { UniversityCard } from '../../components/UniversityCard';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const FilterOption: React.FC<{ label: string, isActive: boolean, onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-3 rounded-xl text-sm font-bold border-2 transition-all ${isActive ? 'border-secondary-purple bg-secondary-purple/10 text-secondary-purple' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'}`}
  >
    {label}
  </button>
);

export default function UniversitiesPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [filterState, setFilterState] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStream, setFilterStream] = useState('All');

  const [visibleCount, setVisibleCount] = useState(10);
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      if (['Engineering', 'Medicine', 'Law'].includes(q)) setFilterStream(q);
      else setSearch(q);
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tsap_saved_unis');
      if (saved) setSavedUniversities(JSON.parse(saved));
    }
  }, []);

  const toggleSave = (id: string) => {
    if (typeof window === 'undefined') return;
    const newSaved = savedUniversities.includes(id) 
      ? savedUniversities.filter(sid => sid !== id)
      : [...savedUniversities, id];
    
    setSavedUniversities(newSaved);
    localStorage.setItem('tsap_saved_unis', JSON.stringify(newSaved));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const searchLower = search.toLowerCase();
      const matchesSearch = uni.name.toLowerCase().includes(searchLower) || 
                           uni.city.toLowerCase().includes(searchLower) ||
                           uni.courses.some(c => c.eligibility.toLowerCase().includes(searchLower)); 

      const matchesState = filterState === 'All' || uni.state === filterState;
      const matchesType = filterType === 'All' || uni.type === filterType;
      
      let matchesStream = true;
      if (filterStream === 'Engineering') {
        matchesStream = uni.courses.some(c => c.name.includes('B.Tech') || c.name.includes('B.E'));
      }
      return matchesSearch && matchesState && matchesType && matchesStream;
    });
  }, [search, filterState, filterType, filterStream]);

  const activeFilterCount = [filterState, filterType, filterStream].filter(f => f !== 'All').length;

  return (
    <div className="min-h-screen pb-32">
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search colleges, exams..."
                className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-teal/20 focus:outline-none transition-all text-base font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilterSheet(true)}
              className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl transition-all ${activeFilterCount > 0 ? 'bg-secondary-purple text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}
            >
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-black mb-1">{filteredUniversities.length} Universities Found</h1>
          <p className="text-sm text-slate-500">Showing top results verified for 2025-26 admission cycle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredUniversities.slice(0, visibleCount).map((uni, idx) => (
             <React.Fragment key={uni.id}>
               <UniversityCard uni={uni} isSaved={savedUniversities.includes(uni.id)} onToggleSave={toggleSave} />
               {idx === 4 && (
                 <div className="col-span-full py-8">
                   <div className="w-full h-48 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-center">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sponsored Opportunity</span>
                   </div>
                 </div>
               )}
             </React.Fragment>
           ))}
        </div>

        {visibleCount < filteredUniversities.length && (
          <div className="mt-12 text-center">
            <button onClick={() => setVisibleCount(v => v + 10)} className="px-8 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold">Load More Colleges</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showFilterSheet && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilterSheet(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed inset-x-0 bottom-0 bg-white dark:bg-slate-900 rounded-t-[2rem] z-50 p-6 flex flex-col shadow-2xl">
              <h2 className="text-xl font-black mb-6">Filter Colleges</h2>
              <div className="space-y-6 pb-10">
                <section>
                  <h3 className="font-bold text-xs uppercase text-slate-500 mb-3">State</h3>
                  <div className="flex gap-2">{['All', 'Telangana', 'Andhra Pradesh'].map(s => <FilterOption key={s} label={s} isActive={filterState === s} onClick={() => setFilterState(s)} />)}</div>
                </section>
              </div>
              <button onClick={() => setShowFilterSheet(false)} className="w-full py-4 bg-primary-teal text-white font-bold rounded-2xl">Apply Filters</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}