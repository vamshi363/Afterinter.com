'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, TrendingUp, Search, Info, CheckCircle2, 
  School, Bookmark, Trash2, ArrowRight, Calendar, 
  Banknote, Scale, X, FileText, ClipboardList, 
  Clock, Plus, Save, Filter, MapPin, Compass
} from 'lucide-react';
import { universities } from '../../data/universities';
import { scholarships } from '../../data/scholarships';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UniversityCard } from '../../components/UniversityCard';

interface Application {
  id: string;
  name: string;
  type: 'University' | 'Scholarship' | 'Exam';
  status: 'To Do' | 'Applied' | 'Pending' | 'Accepted' | 'Rejected';
  deadline?: string;
  notes?: string;
}

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<'cutoff' | 'fee' | 'calendar' | 'roi' | 'compare' | 'checklist' | 'scholarship-check' | 'tracker'>('cutoff');
  
  // Predictor State
  const [cutoffExam, setCutoffExam] = useState('TS EAMCET');
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OC');
  const [gender, setGender] = useState('Male');
  const [branch, setBranch] = useState('CSE');
  const [results, setResults] = useState<{uni: typeof universities[0], probability: string, color: string}[]>([]);

  // Fee Estimator
  const [selectedUni, setSelectedUni] = useState('');
  const [needHostel, setNeedHostel] = useState(false);

  // ROI Calculator
  const [roiFee, setRoiFee] = useState('');
  const [roiSalary, setRoiSalary] = useState('');
  const [roiYears, setRoiYears] = useState<string | null>(null);

  // Compare
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareSearch, setCompareSearch] = useState('');

  // Checklist
  const [checklistType, setChecklistType] = useState('TS EAMCET Counseling');
  const [checklistCategory, setChecklistCategory] = useState('OC');

  // Scholarship Checker
  const [scholState, setScholState] = useState('Telangana');
  const [scholIncome, setScholIncome] = useState('150000');
  const [scholCategory, setScholCategory] = useState('BC');
  const [scholResults, setScholResults] = useState<typeof scholarships>([]);

  // Application Tracker
  const [applications, setApplications] = useState<Application[]>([]);
  const [newApp, setNewApp] = useState<{ name: string; type: Application['type']; status: Application['status'] }>({ name: '', type: 'University', status: 'To Do' });
  const [showAddApp, setShowAddApp] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedApps = localStorage.getItem('tsap_applications');
      if (savedApps) setApplications(JSON.parse(savedApps));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tsap_applications', JSON.stringify(applications));
    }
  }, [applications]);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const rankNum = parseInt(rank);
    if (!rankNum) return;
    
    const predictedResults = universities.filter(u => {
       if (cutoffExam.includes('TS') && u.state !== 'Telangana') return false;
       if (cutoffExam.includes('AP') && u.state !== 'Andhra Pradesh') return false;
       return true;
    }).map(u => {
       const baseCutoff = u.cutoffs[0]?.rank || 40000;
       let multiplier = 1.0;
       if (category === 'BC') multiplier += 0.5;
       if (category === 'SC') multiplier += 2.0;
       if (category === 'ST') multiplier += 2.5;

       let probability = 'Low';
       let color = 'bg-red-100 text-red-700 border-red-200';
       const adjustedCutoff = baseCutoff * multiplier;

       if (rankNum < adjustedCutoff * 0.7) {
         probability = 'Very High';
         color = 'bg-green-100 text-green-700 border-green-200';
       } else if (rankNum < adjustedCutoff) {
         probability = 'High';
         color = 'bg-emerald-100 text-emerald-700 border-emerald-200';
       }

       return { uni: u, probability, color, rawLimit: adjustedCutoff };
    }).filter(item => rankNum < item.rawLimit * 1.5).sort((a,b) => b.rawLimit - a.rawLimit);

    setResults(predictedResults);
  };

  const calculateROI = (e: React.FormEvent) => {
    e.preventDefault();
    const fee = parseFloat(roiFee);
    const salary = parseFloat(roiSalary);
    if (fee && salary) {
      setRoiYears((fee / salary).toFixed(1));
    }
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => prev.includes(id) ? prev.filter(c => c !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  const addApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApp.name) return;
    const app: Application = {
      id: Date.now().toString(),
      name: newApp.name,
      type: newApp.type,
      status: newApp.status,
      deadline: new Date().toISOString().split('T')[0]
    };
    setApplications([...applications, app]);
    setNewApp({ name: '', type: 'University', status: 'To Do' });
    setShowAddApp(false);
  };

  const deleteApplication = (id: string) => setApplications(prev => prev.filter(a => a.id !== id));
  const updateAppStatus = (id: string, status: string) => setApplications(prev => prev.map(a => a.id === id ? { ...a, status: status as Application['status'] } : a));

  const getChecklist = () => {
    const docs = ['Aadhar Card', '10th Marks Memo', '12th Marks Memo', 'Transfer Certificate', 'Photos'];
    if (checklistCategory !== 'OC') docs.push('Caste Certificate');
    if (checklistType.includes('Counseling')) docs.push('Rank Card', 'Income Certificate');
    return docs;
  };

  const estimatedUni = universities.find(u => u.id === selectedUni);
  const compareUnis = universities.filter(u => compareList.includes(u.id));

  // Handle scholarship check
  const handleCheckScholarship = () => {
    const incomeNum = parseInt(scholIncome);
    const eligible = scholarships.filter(s => {
      if (s.type === 'State') {
        if (scholState === 'Telangana' && !s.provider.includes('Telangana')) return false;
        if (scholState === 'Andhra Pradesh' && !s.provider.includes('Andhra')) return false;
      }
      
      const incomeLimit = s.eligibility.match(/₹([\d.]+) Lakh/);
      if (incomeLimit && incomeNum > parseFloat(incomeLimit[1]) * 100000) return false;

      return true;
    });
    setScholResults(eligible);
  };

  const toolsList = [
    { id: 'cutoff', label: 'Cutoff Predictor', icon: <TrendingUp size={18} />, color: 'bg-primary-teal' },
    { id: 'fee', label: 'Fee Estimator', icon: <Calculator size={18} />, color: 'bg-secondary-purple' },
    { id: 'scholarship-check', label: 'Scholarship Checker', icon: <Filter size={18} />, color: 'bg-pink-600' },
    { id: 'tracker', label: 'Application Tracker', icon: <Save size={18} />, color: 'bg-indigo-600' },
    { id: 'compare', label: 'Compare Colleges', icon: <Scale size={18} />, color: 'bg-orange-500' },
    { id: 'checklist', label: 'Document Checklist', icon: <ClipboardList size={18} />, color: 'bg-cyan-600' },
    { id: 'calendar', label: 'Deadlines Calendar', icon: <Calendar size={18} />, color: 'bg-blue-600' },
    { id: 'roi', label: 'ROI Calculator', icon: <Banknote size={18} />, color: 'bg-green-600' },
  ];

  const calendarEvents = [
    { title: "TS EAMCET Exam", date: "2025-05-10", type: "Exam", color: "red" },
    { title: "AP EAPCET Exam", date: "2025-05-15", type: "Exam", color: "red" },
    { title: "TS ICET Exam", date: "2025-05-25", type: "Exam", color: "orange" },
    { title: "TS EAMCET Results", date: "2025-06-15", type: "Result", color: "green" },
    { title: "Phase 1 Counseling", date: "2025-07-01", type: "Counseling", color: "blue" },
    ...scholarships.map(s => ({
      title: `${s.name} Deadline`,
      date: s.deadline.includes('December') ? '2025-12-31' : '2025-09-30', // Mock parsing for demo
      type: "Scholarship",
      color: "purple"
    }))
  ].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getDaysLeft = (dateStr: string) => {
     const days = Math.ceil((new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
     return days > 0 ? `${days} days left` : 'Passed';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Student Toolbox</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Verified data and smart tools to guide your education journey in Telangana & AP.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/4 space-y-3">
          {toolsList.map((tool) => (
            <button 
              key={tool.id}
              onClick={() => setActiveTool(tool.id as typeof activeTool)}
              className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center space-x-4 ${activeTool === tool.id ? `${tool.color} text-white shadow-lg` : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/20">{tool.icon}</div>
              <span className="font-bold text-sm">{tool.label}</span>
            </button>
          ))}
        </div>

        <div className="lg:w-3/4">
          <AnimatePresence mode="wait">
            {activeTool === 'cutoff' && (
              <motion.div key="cutoff" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black mb-6">Cutoff Predictor</h2>
                <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400">Entrance Exam</label>
                    <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none" value={cutoffExam} onChange={e => setCutoffExam(e.target.value)}>
                      <option>TS EAMCET</option><option>AP EAPCET</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400">Rank</label>
                    <input type="number" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none" value={rank} onChange={e => setRank(e.target.value)} placeholder="e.g. 15000" />
                  </div>
                  <button type="submit" className="md:col-span-2 py-4 bg-primary-teal text-white font-black rounded-xl">Check Probabilities</button>
                </form>
                {results.length > 0 && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((r, i) => (
                      <div key={i} className="p-4 border rounded-2xl">
                        <h4 className="font-bold">{r.uni.name}</h4>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.color}`}>{r.probability} Chance</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTool === 'tracker' && (
              <motion.div key="tracker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black">Application Tracker</h2>
                  <button onClick={() => setShowAddApp(!showAddApp)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><Plus size={20}/></button>
                </div>
                {showAddApp && (
                  <form onSubmit={addApplication} className="mb-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input className="p-3 rounded-lg" placeholder="Name" value={newApp.name} onChange={e => setNewApp({...newApp, name: e.target.value})} required />
                    <select className="p-3 rounded-lg" value={newApp.status} onChange={e => setNewApp({...newApp, status: e.target.value as Application['status']})}><option>To Do</option><option>Applied</option></select>
                    <button type="submit" className="bg-indigo-600 text-white font-bold rounded-lg">Save</button>
                  </form>
                )}
                <div className="space-y-3">
                  {applications.map(app => (
                    <div key={app.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl flex justify-between items-center">
                      <div><h4 className="font-bold">{app.name}</h4><span className="text-xs text-slate-500">{app.status}</span></div>
                      <button onClick={() => deleteApplication(app.id)} className="text-red-400"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTool === 'roi' && (
              <motion.div key="roi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black mb-6">ROI Calculator</h2>
                <form onSubmit={calculateROI} className="space-y-4">
                  <input className="w-full p-4 bg-slate-50 rounded-xl" type="number" placeholder="Total Fees (e.g. 500000)" value={roiFee} onChange={e => setRoiFee(e.target.value)} />
                  <input className="w-full p-4 bg-slate-50 rounded-xl" type="number" placeholder="Expected Salary/Year (e.g. 400000)" value={roiSalary} onChange={e => setRoiSalary(e.target.value)} />
                  <button className="w-full py-4 bg-green-600 text-white font-bold rounded-xl">Calculate</button>
                </form>
                {roiYears && <div className="mt-8 text-center"><p className="text-slate-500 text-sm">Payback Period</p><h3 className="text-4xl font-black text-green-600">{roiYears} Years</h3></div>}
              </motion.div>
            )}
            
            {activeTool === 'checklist' && (
              <motion.div key="checklist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black mb-6">Document Checklist</h2>
                <div className="space-y-3">
                  {getChecklist().map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <CheckCircle2 size={18} className="text-slate-300" />
                      <span className="font-medium text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTool === 'compare' && (
              <motion.div key="compare" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black mb-6">Compare Colleges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {universities.slice(0, 4).map(u => (
                    <button key={u.id} onClick={() => toggleCompare(u.id)} className={`p-4 border rounded-2xl text-left ${compareList.includes(u.id) ? 'border-orange-500 bg-orange-50' : ''}`}>
                      <h4 className="font-bold text-sm">{u.name}</h4>
                      <p className="text-xs text-slate-500">{u.city}</p>
                    </button>
                  ))}
                </div>
                {compareList.length > 1 && (
                  <Link href={`/compare?ids=${compareList.join(',')}`} className="mt-6 block text-center py-4 bg-orange-500 text-white font-bold rounded-xl">Compare Selected</Link>
                )}
              </motion.div>
            )}

            {activeTool === 'fee' && (
              <motion.div key="fee" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black mb-6">Fee Estimator</h2>
                <select className="w-full p-4 bg-slate-50 rounded-xl mb-4" value={selectedUni} onChange={e => setSelectedUni(e.target.value)}>
                  <option value="">Select University</option>
                  {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
                {estimatedUni && (
                  <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <div className="flex justify-between mb-2"><span>Tuition:</span><span className="font-bold">{estimatedUni.fees.tuition}</span></div>
                    <div className="flex justify-between"><span>Hostel:</span><span className="font-bold">{estimatedUni.fees.hostel}</span></div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTool === 'scholarship-check' && (
              <motion.div key="scholarship-check" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black mb-6">Scholarship Checker</h2>
                <div className="space-y-4">
                   <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl" value={scholState} onChange={e => setScholState(e.target.value)}><option>Telangana</option><option>Andhra Pradesh</option></select>
                   <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl" value={scholIncome} onChange={e => setScholIncome(e.target.value)}><option value="100000">Less than 1L</option><option value="200000">Less than 2L</option></select>
                   <button onClick={handleCheckScholarship} className="w-full py-4 bg-pink-600 text-white font-black rounded-xl">Find Scholarships</button>
                </div>
                <div className="mt-6 space-y-2">
                   {scholResults.map(s => <div key={s.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold text-sm">{s.name}</div>)}
                </div>
              </motion.div>
            )}

            {activeTool === 'calendar' && (
              <motion.div key="calendar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black mb-6">Deadlines Calendar</h2>
                <div className="space-y-4">
                   {calendarEvents.map((ev, i) => (
                     <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <div><div className="font-bold">{ev.title}</div><div className="text-xs text-slate-500">{ev.date}</div></div>
                        <span className="text-xs font-bold bg-white dark:bg-slate-900 px-2 py-1 rounded">{getDaysLeft(ev.date)}</span>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}