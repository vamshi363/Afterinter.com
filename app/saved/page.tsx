
'use client';

import React, { useState, useEffect } from 'react';
import { universities } from '@/data/universities';
import { UniversityCard } from '@/components/UniversityCard';
import { Heart, Search, Scale } from 'lucide-react';
import Link from 'next/link';

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('tsap_saved_unis') || '[]');
      setSavedIds(saved);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  const savedUniversities = universities.filter(u => savedIds.includes(u.id));

  const toggleSave = (id: string) => {
    const newSaved = savedIds.filter(sid => sid !== id);
    setSavedIds(newSaved);
    localStorage.setItem('tsap_saved_unis', JSON.stringify(newSaved));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  if (loading) return <div className="p-20 text-center animate-pulse">Loading saved items...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[80vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <Heart className="fill-red-500 text-red-500" size={32} />
            My Saved List
          </h1>
          <p className="text-slate-500">Your shortlisted colleges for quick access and comparison.</p>
        </div>
        {savedIds.length >= 2 && (
          <Link 
            href={`/compare?ids=${savedIds.slice(0,3).join(',')}`}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800"
          >
            <Scale size={18} /> Compare These
          </Link>
        )}
      </div>

      {savedUniversities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedUniversities.map(uni => (
            <UniversityCard 
              key={uni.id} 
              uni={uni} 
              isSaved={true} 
              onToggleSave={toggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Saved Colleges Yet</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Browse through our verified list of universities and tap the heart icon to save them here for later.</p>
          <Link href="/universities" className="bg-primary-teal hover:bg-teal-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg inline-flex items-center gap-2">
            <Search size={20} /> Browse Universities
          </Link>
        </div>
      )}
    </div>
  );
}