import React from 'react';
import { blogPosts } from '@/data/blogPosts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { AdSense } from '@/components/AdSense';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      <div className="bg-slate-50 dark:bg-slate-900 pt-12 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary-teal mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-slate-500">
             <User size={20} />
             <span className="text-sm font-bold">Education Desk • {new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <article className="prose dark:prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  );
}