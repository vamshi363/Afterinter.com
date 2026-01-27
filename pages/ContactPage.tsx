
import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Integration logic would go here
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">Contact Us</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Have questions about admissions in Telangana/AP? Spotted an error in our data? 
          We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Mail className="text-primary-teal" size={20} /> Email Support
            </h3>
            <p className="text-slate-500 text-sm mb-2">For general inquiries, data corrections, and advertising:</p>
            <a href="mailto:support@afterinter.com" className="text-lg font-bold text-slate-900 dark:text-white hover:text-primary-teal transition-colors">
              support@afterinter.com
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-secondary-purple" size={20} /> Office Location
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              <strong>After Inter Digital Team</strong><br />
              Hitech City, Madhapur<br />
              Hyderabad, Telangana - 500081<br />
              India
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
             <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">Note on Counseling</h4>
             <p className="text-xs text-blue-600 dark:text-blue-300">
               We provide information services only. We are not a direct counseling authority. Please contact TSCHE or APSCHE for official admission disputes.
             </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-slate-500 text-sm">Thank you for reaching out. We usually respond within 24-48 business hours.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-primary-teal font-bold text-sm hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Your Name</label>
                <input required type="text" className="w-full p-3 rounded-xl border-none bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-teal outline-none transition-all" placeholder="Student / Parent Name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
                <input required type="email" className="w-full p-3 rounded-xl border-none bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-teal outline-none transition-all" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Topic</label>
                <select className="w-full p-3 rounded-xl border-none bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-teal outline-none transition-all">
                  <option>Data Correction / Update</option>
                  <option>Advertising Inquiry</option>
                  <option>Scholarship Help</option>
                  <option>Technical Issue</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Message</label>
                <textarea required rows={4} className="w-full p-3 rounded-xl border-none bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-teal outline-none transition-all" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
                Send Message <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
