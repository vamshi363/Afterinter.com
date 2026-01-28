'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { universities } from '@/data/universities';
import { Search, Filter, X, ChevronDown, Info } from 'lucide-react';
import { UniversityCard } from '@/components/UniversityCard';
import { motion, AnimatePresence } from 'framer-motion';

function UniversitiesList() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [filterState, setFilterState] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStream, setFilterStream] = useState('All');
  const [visibleCount, setVisibleCount] = useState(10);
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);

  useEffect(() => {
    const q = searchParams?.get('q');
    if (q) {
      if (['Engineering', 'Medicine', 'Law'].includes(q)) setFilterStream(q);
      else setSearch(q);
    }
    const saved = localStorage.getItem('tsap_saved_unis');
    if (saved) setSavedUniversities(JSON.parse(saved));
  }, [searchParams]);

  const toggleSave = (id: string) => {
    const newSaved = savedUniversities.includes(id) 
      ? savedUniversities.filter(sid => sid !== id)
      : [...savedUniversities, id];
    setSavedUniversities(newSaved);
    localStorage.setItem('tsap_saved_unis', JSON.stringify(newSaved));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const s = search.toLowerCase();
      const matchesSearch = uni.name.toLowerCase().includes(s) || 
                           uni.city.toLowerCase().includes(s) ||
                           uni.courses.some(c => c.eligibility.toLowerCase().includes(s)); 
      const matchesState = filterState === 'All' || uni.state === filterState;
      const matchesType = filterType === 'All' || uni.type === filterType;
      const matchesStream = filterStream === 'All' || uni.courses.some(c => c.name.includes(filterStream));
      return matchesSearch && matchesState && matchesType && matchesStream;
    });
  }, [search, filterState, filterType, filterStream]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
       <div className="flex gap-3 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search colleges..."
              className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-900 rounded-2xl outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.slice(0, visibleCount).map(uni => (
            <UniversityCard 
              key={uni.id}
              uni={uni} 
              isSaved={savedUniversities.includes(uni.id)}
              onToggleSave={toggleSave}
            />
          ))}
       </div>
    </div>
  );
}

export default function UniversitiesPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center animate-pulse">Loading directory...</div>}>
      <UniversitiesList />
    </Suspense>
  );
}