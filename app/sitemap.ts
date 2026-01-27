import { MetadataRoute } from 'next';
import { universities } from '../data/universities';
import { exams } from '../data/exams';
import { scholarships } from '../data/scholarships';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.afterinter.com';

  const staticPages = [
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const universityUrls = universities.map((uni) => ({
    url: `${baseUrl}/universities/${uni.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const examUrls = exams.map((exam) => ({
    url: `${baseUrl}/exams/${exam.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const scholarshipUrls = scholarships.map((scholar) => ({
    url: `${baseUrl}/scholarships/${scholar.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...universityUrls, ...examUrls, ...scholarshipUrls];
}