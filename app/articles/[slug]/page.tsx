import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';

// In a real app, fetch data based on slug. 
// For this architecture demo, we render a sample static structure.

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${title} | AfterInter Insights`,
    description: `Read detailed analysis about ${title}. Essential guide for students.`,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/articles" className="inline-flex items-center text-slate-500 hover:text-primary-teal font-bold mb-8">
        <ArrowLeft size={18} className="mr-2" /> Back to Articles
      </Link>

      <article className="prose dark:prose-invert prose-slate prose-lg max-w-none">
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
          {title}
        </h1>
        
        <div className="flex items-center gap-6 text-sm text-slate-500 mb-10 border-b border-slate-200 dark:border-slate-800 pb-6">
          <span className="flex items-center gap-2"><User size={16} /> By Education Desk</span>
          <span className="flex items-center gap-2"><Calendar size={16} /> May 2025</span>
        </div>

        {/* SAMPLE SEO CONTENT STRUCTURE */}
        <p>
          Choosing the right educational path is one of the most critical decisions for students in Telangana and Andhra Pradesh. 
          With hundreds of engineering colleges and evolving admission norms, it's easy to feel overwhelmed.
        </p>

        <h2>Understanding the Landscape</h2>
        <p>
          The admission process in both states is primarily driven by the EAPCET (Engineering, Agriculture and Pharmacy Common Entrance Test). 
          Scoring a good rank is just the first step. Understanding counseling procedures, fee reimbursement eligibility, and college placement records is equally vital.
        </p>

        <h3>Key Factors to Consider</h3>
        <ul>
          <li><strong>Accreditation:</strong> Look for NAAC 'A' or 'A++' grades and NBA accreditation for specific branches.</li>
          <li><strong>Placements:</strong> Don't just look at the "Highest Package". Focus on the "Average Package" and "Placement Percentage".</li>
          <li><strong>Faculty:</strong> A college is only as good as its teachers. Look for institutions with PhD-qualified faculty.</li>
        </ul>

        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border-l-4 border-primary-teal my-8 not-prose">
          <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Pro Tip</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Always verify the college code during web options entry. Many colleges have similar names but vastly different reputations.
          </p>
        </div>

        <h2>Conclusion</h2>
        <p>
          Research is key. Use tools like our <Link href="/tools" className="text-primary-teal no-underline hover:underline">Cutoff Predictor</Link> to gauge your chances realistically. 
          Visit official websites and talk to seniors before freezing your options.
        </p>
      </article>
    </div>
  );
}