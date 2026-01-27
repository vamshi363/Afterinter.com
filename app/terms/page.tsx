import React from 'react';

export const metadata = {
  title: 'Terms of Use | AfterInter',
  description: 'Terms and conditions for using the AfterInter education discovery platform.'
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white border-b pb-4">Terms of Use</h1>
      <div className="prose dark:prose-invert prose-slate max-w-none space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
          <p>By accessing AfterInter.com, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on AfterInter's website for personal, non-commercial transitory viewing only.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Disclaimer</h2>
          <p>The materials on AfterInter's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Accuracy of Materials</h2>
          <p>The materials appearing on AfterInter's website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.</p>
        </section>
      </div>
    </div>
  );
}