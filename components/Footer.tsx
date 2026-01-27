import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { AdSense } from './AdSense';

const Footer = () => (
  <footer className="mt-auto border-t py-12 bg-slate-900 border-slate-800 text-slate-400 mb-20 md:mb-0">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-primary-teal p-1.5 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>
          <span className="font-bold text-xl text-white">AfterInter</span>
        </div>
        <p className="text-sm leading-relaxed mb-6">Empowering intermediate students in Telangana and Andhra Pradesh with verified education discovery tools, counseling updates, and scholarship data.</p>
      </div>
      <div>
        <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Resources</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><Link href="/universities" className="hover:text-primary-teal transition-colors">College Directory</Link></li>
          <li><Link href="/exams" className="hover:text-primary-teal transition-colors">Entrance Exams</Link></li>
          <li><Link href="/scholarships" className="hover:text-primary-teal transition-colors">Scholarship Finder</Link></li>
          <li><Link href="/blog" className="hover:text-primary-teal transition-colors">Education Blog</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Company</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><Link href="/about" className="hover:text-primary-teal transition-colors">About Us</Link></li>
          <li><Link href="/contact" className="hover:text-primary-teal transition-colors">Contact Support</Link></li>
          <li><Link href="/saved" className="hover:text-primary-teal transition-colors">My Shortlist</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Legal</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><Link href="/privacy-policy" className="hover:text-primary-teal transition-colors">Privacy Policy</Link></li>
          <li><Link href="/terms" className="hover:text-primary-teal transition-colors">Terms & Conditions</Link></li>
          <li><Link href="/disclaimer" className="hover:text-primary-teal transition-colors">Disclaimer</Link></li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center">
       <p className="text-xs text-slate-500 mb-4 tracking-wide">© 2025 AfterInter. Content is for guidance only. Verify with official TSCHE/APSCHE portals.</p>
       <div className="flex justify-center">
          <AdSense slot="1234567890" label="Sponsor" />
       </div>
    </div>
  </footer>
);

export default Footer;