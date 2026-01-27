import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education Guides & Analysis | AfterInter Blog',
  description: 'In-depth articles on EAMCET preparation, college reviews, scholarship guides, and admission processes in Telangana and Andhra Pradesh.',
};

const articles = [
  {
    slug: 'top-engineering-colleges-in-telangana-2025',
    title: 'Top 10 Engineering Colleges in Telangana: 2025 Ranking & Cutoffs',
    excerpt: 'A comprehensive guide to the best engineering institutes in Telangana based on placement records, infrastructure, and TS EAMCET cutoffs.',
    date: 'May 15, 2025',
    category: 'College Rankings'
  },
  {
    slug: 'jvd-scholarship-guide-ap',
    title: 'Jagananna Vidya Deevena (JVD) 2025: Eligibility & Application Process',
    excerpt: 'Everything you need to know about the full fee reimbursement scheme in Andhra Pradesh. Step-by-step application guide.',
    date: 'May 10, 2025',
    category: 'Scholarships'
  },
  {
    slug: 'ts-eamcet-vs-jee-main',
    title: 'TS EAMCET vs JEE Main: Which Exam Should You Prioritize?',
    excerpt: 'An analysis of syllabus overlap, difficulty levels, and college options to help intermediate students plan their preparation strategy.',
    date: 'May 05, 2025',
    category: 'Exam Strategy'
  }
];

export default function ArticlesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">Education Insights</h1>
        <p className="text-slate-500 text-lg">Expert analysis and guides for students in TS & AP.</p>
      </div>

      <div className="grid gap-8">
        {articles.map((article) => (
          <article key={article.slug} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-primary-teal uppercase tracking-widest">
              <BookOpen size={16} /> {article.category}
            </div>
            <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white hover:text-primary-teal transition-colors">
              <Link href={`/articles/${article.slug}`}>{article.title}</Link>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
              <span className="text-sm text-slate-400 font-medium">{article.date}</span>
              <Link href={`/articles/${article.slug}`} className="text-sm font-bold text-slate-900 dark:text-white hover:underline">
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}