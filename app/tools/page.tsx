'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { 
  Calculator, TrendingUp, Search, Info, CheckCircle2, 
  School, Bookmark, Trash2, ArrowRight, Calendar, 
  Banknote, Scale, X, FileText, ClipboardList, 
  Clock, Plus, Save, Filter, MapPin, Compass
} from 'lucide-react';
import { universities } from '@/data/universities';
import { scholarships } from '@/data/scholarships';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UniversityCard } from '@/components/UniversityCard';

interface Application {
  id: string;
  name: string;
  type: 'University' | 'Scholarship' | 'Exam';
  status: 'To Do' | 'Applied' | 'Pending' | 'Accepted' | 'Rejected';
  deadline?: string;
}

function ToolsContent() {
  const [activeTool, setActiveTool] = useState<'cutoff' | 'fee' | 'calendar' | 'roi' | 'compare' | 'checklist' | 'scholarship-check' | 'tracker'>('cutoff');
  const [cutoffExam, setCutoffExam] = useState('TS EAMCET');
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OC');
  const [results, setResults] = useState<{uni: any, probability: string, color: string}[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [showAddApp, setShowAddApp] = useState(false);
  const [newApp, setNewApp] = useState<Partial<Application>>({ name: '', type: 'University', status: 'To Do' });

  useEffect(() => {
    const savedApps = localStorage.getItem('tsap_applications');
    if (savedApps) setApplications(JSON.parse(savedApps));
  }, []);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const rankNum = parseInt(rank);
    if (!rankNum) return;
    
    const predicted = universities.filter(u => {
       if (cutoffExam.includes('TS') && u.state !== 'Telangana') return false;
       if (cutoffExam.includes('AP') && u.state !== 'Andhra Pradesh') return false;
       return true;
    }).map(u => {
       const base = u.cutoffs[0]?.rank || 40000;
       let prob = 'Low';
       let col = 'bg-red-100 text-red-700';
       if (rankNum < base * 0.8) { prob = 'Very High'; col = 'bg-green-100 text-green-700'; }
       else if (rankNum < base) { prob = 'High'; col = 'bg-emerald-100 text-emerald-700'; }
       return { uni: u, probability: prob, color: col };
    }).slice(0, 6);
    setResults(predicted);
  };

  const toolsList = [
    { id: 'cutoff', label: 'Cutoff Predictor', icon: <TrendingUp size={18} />, color: 'bg-primary-teal' },
    { id: 'tracker', label: 'App Tracker', icon: <Save size={18} />, color: 'bg-indigo-600' },
    { id: 'fee', label: 'Fee Estimator', icon: <Calculator size={18} />, color: 'bg-secondary-purple' },
    { id: 'compare', label: 'Compare Colleges', icon: <Scale size={18} />, color: 'bg-orange-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Student Toolbox</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Verified data and smart tools to guide your education journey.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/4 space-y-3">
          {toolsList.map((tool) => (
            <button 
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center space-x-4 ${activeTool === tool.id ? `${tool.color} text-white shadow-lg` : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/20">{tool.icon}</div>
              <span className="font-bold text-sm">{tool.label}</span>
            </button>
          ))}
        </div>

        <div className="lg:w-3/4">
          {activeTool === 'cutoff' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-black mb-6">Cutoff Predictor</h2>
              <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="number" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl" value={rank} onChange={e => setRank(e.target.value)} placeholder="Enter Rank (e.g. 15000)" />
                <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl" value={cutoffExam} onChange={e => setCutoffExam(e.target.value)}>
                  <option>TS EAMCET</option><option>AP EAPCET</option>
                </select>
                <button type="submit" className="md:col-span-2 py-4 bg-primary-teal text-white font-black rounded-xl">Analyze My Chances</button>
              </form>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((r, i) => (
                  <div key={i} className="p-4 border rounded-2xl flex justify-between items-center">
                    <span className="font-bold text-sm truncate max-w-[150px]">{r.uni.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${r.color}`}>{r.probability}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTool !== 'cutoff' && (
             <div className="bg-slate-50 dark:bg-slate-900 p-20 text-center rounded-[2.5rem] border border-dashed">
                <p className="text-slate-400 font-bold uppercase tracking-widest">Select a tool to begin</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center animate-pulse font-bold">Initializing Tools...</div>}>
      <ToolsContent />
    </Suspense>
  );
}