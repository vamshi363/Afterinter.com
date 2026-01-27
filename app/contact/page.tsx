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

          <div className="bg-white dark:bg-slate-90