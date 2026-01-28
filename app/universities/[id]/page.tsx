'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { universities } from '@/data/universities';
import { MapPin, CheckCircle2, BookOpen, IndianRupee, Building2, ExternalLink, ArrowLeft, Heart } from 'lucide-react';

interface Props {
  params: { id: string };
}

export default function UniversityDetailsPage({ params }: Props) {
  const { id } = params;
  const uni = universities.find(u => u.id === id);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tsap_saved_unis') || '[]');
    setIsSaved(saved.includes(id));
  }, [id]);

  if (!uni) return <div className="p-20 text-center">University not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/universities" className="inline-flex items-center text-slate-500 mb-8 font-bold">
        <ArrowLeft className="mr-2" /> Back to Directory
      </Link>
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-black mb-4">{uni.name}</h1>
        <p className="text-slate-500 mb-8">{uni.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <h3 className="font-bold text-lg">Contact Info</h3>
              <p className="flex items-center gap-2"><MapPin size={16} /> {uni.address}</p>
              <a href={uni.website} target="_blank" className="text-primary-teal underline flex items-center gap-2">
                Official Website <ExternalLink size={16} />
              </a>
           </div>
           <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4">Fee Structure</h3>
              <p className="flex justify-between"><span>Tuition:</span> <b>{uni.fees.tuition}</b></p>
              <p className="flex justify-between"><span>Hostel:</span> <b>{uni.fees.hostel}</b></p>
           </div>
        </div>
      </div>
    </div>
  );
}