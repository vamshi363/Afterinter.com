import React from 'react';

export const metadata = {
  title: 'Disclaimer | AfterInter',
  description: 'Legal disclaimer for AfterInter educational portal. Information accuracy and official source verification.'
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white border-b pb-4">Disclaimer</h1>
      <div className="prose dark:prose-invert prose-slate max-w-none space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Educational Purposes Only</h2>
          <p>The information provided by AfterInter ("we", "us", or "our") on our website is for general educational and informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Official Verification Mandatory</h2>
          <p>Admission dates, fee structures, cutoff ranks, and scholarship eligibility criteria are subject to change by the respective governing bodies (TSCHE, APSCHE, JoSAA, NTA, etc.). Users are <strong>strictly advised</strong> to verify all details on the official university or government portal before making any financial commitments or application submissions.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No Professional Advice</h2>
          <p>The site cannot and does not contain career counseling or legal advice. The educational information is provided for general guidance and should not be treated as a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Third-Party Links</h2>
          <p>Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with us. Please note that AfterInter does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
        </section>
      </div>
    </div>
  );
}