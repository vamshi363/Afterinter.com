'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { universities } from '../../../data/universities';
import { 
  MapPin, Shield, CheckCircle2, BookOpen, IndianRupee, 
  Building2, ExternalLink, Phone, Mail, GraduationCap, 
  ArrowLeft, Heart, ShieldCheck, Star, Navigation, Camera, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function UniversityDetailsPage() {
  const { id } = useParams();
  const uni = universities.find(u => u.id === id);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id) {
      const saved = JSON.parse(localStorage.getItem('tsap_saved_unis') || '[]');
      setIsSaved(saved.includes(id));
    }
  }, [id]);

  if (!uni) return <div className="p-20 text-center font-bold text-xl">University not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="bg-white dark:bg-slate-900 pt-8 pb-12 px-4 rounded-b-[3rem] shadow-sm border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
           <Link href="/universities" className="inline-flex items-center text-slate-500 hover:text-primary-teal font-bold mb-8">
             <ArrowLeft size={18} className="mr-2" /> Back to Search
           </Link>
           
           <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center text-3xl font-black text-slate-300">
               {uni.name.charAt(0)}
             </div>
             <div className="flex-1">
               <div className="flex flex-wrap gap-2 mb-4">
                 <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800 flex items-center gap-1">
                   <ShieldCheck size={12} /> Verified Data
                 </span>
                 <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                   {uni.type}
                 </span>
               </div>
               <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">{uni.name}</h1>
               <div className="flex items-center text-slate-500 font-bold">
                 <MapPin size={18} className="mr-2 text-primary-teal" /> {uni.city}, {uni.state}
               </div>
             </div>
           </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-12">
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <Building2 className="text-primary-teal" /> Detailed Overview
          </h2>
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
            <p className="text-lg leading-relaxed">
              {uni.name} is a premier educational institution located in {uni.city}, {uni.state}. Established with a vision to provide world-class technical and professional education, it has consistently ranked among the top institutes in the region. 
            </p>
            <p>
              The institution is affiliated with <strong>{uni.affiliation}</strong> and maintains a high standard of academic rigor. With a <strong>NAAC Grade of {uni.naacGrade}</strong>, students can be assured of quality infrastructure, experienced faculty, and a curriculum that is frequently updated to meet industry requirements. 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><Star className="text-yellow-500" size={18} /> Why Choose {uni.name}?</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-1 shrink-0" /> Robust placement assistance with top MNCs.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-1 shrink-0" /> State-of-the-art research laboratories.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-1 shrink-0" /> Eligible for state scholarships (ePASS/JVD).</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><Navigation className="text-blue-500" size={18} /> Campus Life</h4>
                <p className="text-sm">
                  The campus offers a vibrant environment for holistic development, featuring student-led clubs, annual fests, and comprehensive sports facilities for indoor and outdoor activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800">
           <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
             <BookOpen className="text-primary-teal" /> Courses & Fees
           </h2>
           <div className="space-y-6">
              {uni.courses.map((course, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 gap-4">
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-lg">{course.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{course.level} • {course.duration}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300">
                     Eligibility: {course.eligibility}
                  </div>
                </div>
              ))}
           </div>
           
           <div className="mt-12 pt-8 border-t dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 text-primary-teal rounded-2xl flex items-center justify-center shrink-0">
                    <IndianRupee size={28} />
                 </div>
                 <div>
                    <span className="text-xs font-black uppercase text-slate-400">Estimated Tuition</span>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{uni.fees.tuition}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 text-orange-500 rounded-2xl flex items-center justify-center shrink-0">
                    <Building2 size={28} />
                 </div>
                 <div>
                    <span className="text-xs font-black uppercase text-slate-400">Hostel Accommodation</span>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{uni.fees.hostel}</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Official Verification</h2>
            <p className="text-slate-400 mb-8 max-w-xl">Always verify admission dates, seat availability, and specific course details on the university's official website or during the counseling process.</p>
            <div className="flex flex-wrap gap-4">
               <a href={uni.website} target="_blank" rel="noopener noreferrer" className="bg-primary-teal hover:bg-teal-600 text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 transition-all">
                  Visit Website <ExternalLink size={18} />
               </a>
            </div>
          </div>
          <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
        </section>
      </div>
    </div>
  );
}