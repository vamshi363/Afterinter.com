import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | AfterInter',
  description: 'Detailed Privacy Policy regarding data collection, cookies, and Google AdSense usage on AfterInter.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">Privacy Policy</h1>
      <div className="prose dark:prose-invert prose-slate max-w-none space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
        <p><strong>Effective Date:</strong> May 20, 2025</p>
        
        <p>At AfterInter, accessible from https://www.afterinter.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by AfterInter and how we use it.</p>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Log Files</h2>
          <p>AfterInter follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Cookies and Web Beacons</h2>
          <p>Like any other website, AfterInter uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        </section>

        <section className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Google DoubleClick DART Cookie</h2>
          <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.afterinter.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary-teal underline">https://policies.google.com/technologies/ads</a></p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Advertising Partners Privacy Policies</h2>
          <p>You may consult this list to find the Privacy Policy for each of the advertising partners of AfterInter.</p>
          <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on AfterInter, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
          <p>Note that AfterInter has no access to or control over these cookies that are used by third-party advertisers.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>Under the CCPA, among other rights, California consumers have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
          <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">GDPR Data Protection Rights</h2>
          <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
          <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Consent</h2>
          <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
        </section>
      </div>
    </div>
  );
}