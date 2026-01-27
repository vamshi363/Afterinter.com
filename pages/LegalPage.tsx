
import React from 'react';

export const LegalPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="max-w-4xl mx-auto px-4 py-20">
    <h1 className="text-4xl font-bold mb-8">{title}</h1>
    <div className="prose dark:prose-invert prose-slate max-w-none space-y-6 text-slate-600 dark:text-slate-400">
      <p>Last Updated: May 20, 2025</p>
      
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
        <p>Welcome to After Inter. We are committed to providing verified educational data for students in Telangana and Andhra Pradesh. This website is designed to be compliant with Google AdSense policies and serves as an information aggregator.</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Data Accuracy</h2>
        <p>While we strive to maintain 100% verified data from official university and government scholarship portals, users are advised to always cross-check details with the official source before taking any admission-related action.</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Monetization Transparency</h2>
        <p>This site may display advertisements from Google AdSense. These ads are clearly marked and do not represent endorsements of any particular third-party institution.</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Advertising & Cookies</h2>
        <p className="mb-2"><strong>Google AdSense:</strong> We use Google AdSense to serve advertisements on this website. Google uses cookies to help serve the ads it displays on the websites of its partners, such as websites displaying Google ads or participating in Google certified ad networks. When users visit a Google partner's website, a cookie may be dropped on that end user's browser.</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-teal underline">Google Ad Settings</a>.</li>
          <li>Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary-teal underline">www.aboutads.info</a>.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Privacy & User Data</h2>
        <p>We respect your privacy. We do not sell your personal information. Any data collected via contact forms is used solely to respond to inquiries.</p>
      </section>
    </div>
  </div>
);
