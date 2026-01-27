
import React from 'react';
import { ShieldCheck, Database, Users, GraduationCap, Award, BookOpen } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Empowering Students in <br/><span className="text-primary-teal">Telangana & Andhra Pradesh</span></h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          After Inter is a centralized education discovery platform designed to simplify the complex admission process for students completing their intermediate education.
        </p>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Database size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Verified Data</h3>
          <p className="text-sm text-slate-500">We aggregate data directly from official sources like TSCHE, APSCHE, JoSAA, and university portals.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Student First</h3>
          <p className="text-sm text-slate-500">Our tools, like the Fee Estimator and Cutoff Predictor, are built to answer real student questions.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Transparency</h3>
          <p className="text-sm text-slate-500">We clearly distinguish between government-aided schemes and private opportunities.</p>
        </div>
      </div>

      {/* Editorial Policy & Story */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] mb-12 border border-slate-100 dark:border-slate-800">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap className="text-primary-teal" /> Our Story
        </h2>
        <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400 max-w-none">
          <p className="mb-4">
            Founded in 2024, <strong>After Inter</strong> was built with a singular realization: students from Hyderabad to Vijayawada struggle to find accurate, consolidated information about engineering and degree colleges.
          </p>
          <p className="mb-4">
            While there are many national portals, few focus specifically on the nuances of <strong>EAMCET counseling</strong>, local scholarship schemes like <strong>ePASS and JVD</strong>, and the specific needs of Telugu-speaking students. We bridge that gap by providing a localized, data-driven platform.
          </p>
          <p>
            Our team consists of education analysts and engineers passionate about democratizing access to quality education information.
          </p>
        </div>
      </div>

      {/* Offerings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
               <Award className="text-orange-500" />
               <h3 className="font-bold text-lg">Scholarship Discovery</h3>
            </div>
            <p className="text-sm text-slate-500">
               Comprehensive database of State (ePASS, JVD), Central (NSP), and Private scholarships available for local students.
            </p>
         </div>
         <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
               <BookOpen className="text-blue-500" />
               <h3 className="font-bold text-lg">Exam Guidance</h3>
            </div>
            <p className="text-sm text-slate-500">
               Detailed syllabus, patterns, and deadlines for TS EAMCET, AP EAPCET, JEE, NEET, and other entrance tests.
            </p>
         </div>
      </div>
    </div>
  );
};

export default AboutPage;
