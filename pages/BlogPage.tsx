
'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Student <span className="text-primary-teal">Resource Center</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Expert analysis, admission guides, and scholarship updates to help you navigate your educational journey in TS & AP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.slug}
              className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="p-8 flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-purple/10 text-secondary-purple text-[10px] font-bold uppercase tracking-widest">
                    {post.category}
                  </span>
                  <span className="flex items-center text-xs text-slate-400 font-medium">
                    <Calendar size={12} className="mr-1" />
                    {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-primary-teal transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-8 pb-8 pt-0 mt-auto">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary-teal transition-colors"
                >
                  Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
