
import React from 'react';
import { ShieldCheck, Database, Users, GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'About AfterInter | Our Mission & Team',
  description: 'Learn about AfterInter, the premier education discovery platform for students in Telangana and Andhra Pradesh.'
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
          Empowering Students in <br/><span className="text-primary-teal">Telangana & Andhra Pradesh</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          AfterInter is a centralized education discovery platform designed to simplify the complex admission process for students completing their intermediate education.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Database size={32} />
          </div>
          <h3 className="font-bold text-xl mb-3">Verified Data</h3>
          <p className="text-sm text-slate-500">We aggregate data directly from official sources like TSCHE, APSCHE, and university portals.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users size={32} />
          </div>
          <h3 className="font-bold text-xl mb-3">Student First</h3>
          <p className="text-sm text-slate-500">Our tools are built to answer real questions from students about cutoffs and budgets.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h3 className="font-bold text-xl mb-3">Transparency</h3>
          <p className="text-sm text-slate-500">We clearly distinguish between government-aided schemes and private institutions.</p>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
          <GraduationCap className="text-primary-teal" /> Our Story
        </h2>
        <div className="prose dark:prose-invert prose-slate max-w-none text-lg leading-relaxed text-slate-600 dark:text-slate-400 space-y-4">
          <p>
            Founded in 2024, <strong>AfterInter</strong> was built with a singular realization: students from Hyderabad to Vijayawada struggle to find accurate, consolidated information about engineering and professional colleges.
          </p>
          <p>
            While there are many national portals, few focus specifically on the nuances of <strong>EAMCET counseling</strong>, local scholarship schemes like <strong>ePASS and Jagananna Vasathi Deevena</strong>, and the specific needs of regional students. We bridge that gap by providing a localized, data-driven platform.
          </p>
          <p>
            Our team consists of education analysts, production engineers, and career counselors who are passionate about democratizing access to quality education information. We work tirelessly to ensure that our database is updated within 24 hours of any official notification.
          </p>
        </div>
      </div>
    </div>
  );
}