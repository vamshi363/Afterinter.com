import React from 'react';

export const metadata = {
  title: 'Privacy Policy | AfterInter',
  description: 'Privacy policy for AfterInter education discovery platform including information on cookies and Google AdSense.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white border-b pb-4">Privacy Policy</h1>
      <div className="prose dark:prose-invert prose-slate max-w-none space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
        <p>Last Updated: May 20, 2025</p>
        
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Information We Collect</h2>
          <p>AfterInter ("we", "us", or "our") operates the AfterInter website. We collect minimal personal data to provide a better user experience. This includes information you voluntarily provide via contact forms or login (name, email) and automated technical data collected via cookies.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Cookies and Advertising</h2>
          <p>We use "cookies" to collect information and improve our services. You have the option to either accept or refuse these cookies.</p>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 my-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Google AdSense Usage</h3>
            <p>Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Data Usage</h2>
          <p>We use the collected data to maintain our service, notify you about changes, provide customer support, and gather analysis to improve the portal's educational value.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Compliance</h2>
          <p>We are committed to CCPA and GDPR compliance regarding the handling of your data. If you have any questions, please contact us at support@afterinter.com.</p>
        </section>
      </div>
    </div>
  );
}