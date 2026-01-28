
import { MetadataRoute } from 'next';
import { universities } from '../data/universities';
import { exams } from '../data/exams';
import { scholarships } from '../data/scholarships';
import { blogPosts } from '../data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.afterinter.com';

  const staticRoutes = [
    '',
    '/universities',
    '/exams',
    '/scholarships',
    '/tools',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/exam-finder',
    '/blog',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const universityRoutes = universities.map(uni => ({
    url: `${baseUrl}/universities/${uni.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const examRoutes = exams.map(exam => ({
    url: `${baseUrl}/exams/${exam.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const scholarshipRoutes = scholarships.map(schol => ({
    url: `${baseUrl}/scholarships/${schol.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogRoutes = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...universityRoutes,
    ...examRoutes,
    ...scholarshipRoutes,
    ...blogRoutes,
  ];
}