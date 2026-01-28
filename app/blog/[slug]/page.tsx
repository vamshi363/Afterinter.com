import React from 'react';
import { blogPosts } from '@/data/blogPosts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Share2, User } from 'lucide-react';
import { AdSense } from '@/components/AdSense';

interface Props {
  params: { slug: string };
}

// 1. Generate Static Params for SSG
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Generate Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | AfterInter Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['AfterInter Education Desk'],
    },
    alternates: {
      canonical: `https://www.afterinter.com/blog/${post.slug}`,
    },
  };
}

// 3. Page Component
export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Structured Data for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "AfterInter Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AfterInter",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.afterinter.com/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="bg-slate-50 dark:bg-slate-900 pt-12 pb-16 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary-teal mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-primary-teal/10 text-primary-teal rounded-full text-xs font-black uppercase tracking-widest">
              {post.category}
            </span>
            <span className="flex items-center text-xs font-bold text-slate-500">
              <Calendar size={14} className="mr-1.5" />
              {new Date(post.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <User size={20} className="text-slate-400" />
             </div>
             <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Education Desk</div>
                <div className="text-xs text-slate-500">AfterInter.com</div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <article className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-black prose-a:text-primary-teal hover:prose-a:text-teal-600 prose-img:rounded-3xl">
          {/* AdSense Top */}
          <div className="not-prose mb-8">
             <AdSense slot="1234567890" label="Advertisement" />
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          
          {/* AdSense Bottom */}
          <div className="not-prose mt-12">
             <AdSense slot="0987654321" label="Sponsored" />
          </div>
        </article>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <Tag size={16} /> Related Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {post.keywords.map(tag => (
              <Link 
                key={tag} 
                href={`/blog?q=${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:border-primary-teal hover:text-primary-teal transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}