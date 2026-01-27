'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-[70vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">Get in Touch</h1>
        <p className="text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
          Have questions about admissions in Telangana or AP? Spotted an error in our database? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <Mail className="text-primary-teal" /> Email Support
            </h3>
            <p className="text-slate-500 text-sm mb-4">For general inquiries, data corrections, and advertising partnerships:</p>
            <a href="mailto:support@afterinter.com" className="text-xl font-black text-slate-900 dark:text-white hover:text-primary-teal transition-colors">
              support@afterinter.com
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <MapPin className="text-secondary-purple" /> Office Location
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              <strong>AfterInter Digital Team</strong><br />
              Hitech City, Madhapur<br />
              Hyderabad, Telangana - 500081<br />
              India
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-start gap-4">
             <ShieldCheck className="text-blue-500 shrink-0" size={24} />
             <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
               <strong>Official Note:</strong> We are an information aggregator. For official disputes regarding counseling allotments or exam results, please contact TSCHE or APSCHE directly.
             </p>
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-900 p-10 rounded-[2.5rem]">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black mb-3">Message Sent!</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Thank you for reaching out. Our education analysts will review your message and respond within 48 business hours.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 text-primary-teal font-black text-sm uppercase tracking-widest hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Your Name</label>
                <input required type="text" className="w-full p-4 rounded-xl border-none bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-teal outline-none font-medium" placeholder="Full Name" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Email Address</label>
                <input required type="email" className="w-full p-4 rounded-xl border-none bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-teal outline-none font-medium" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Topic</label>
                <select className="w-full p-4 rounded-xl border-none bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-teal outline-none font-medium appearance-none">
                  <option>Data Correction / Update</option>
                  <option>Advertising Inquiry</option>
                  <option>Counseling Help</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Message</label>
                <textarea required rows={4} className="w-full p-4 rounded-xl border-none bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-teal outline-none font-medium" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-xl">
                Send Message <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}