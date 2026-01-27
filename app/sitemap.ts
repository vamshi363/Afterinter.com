import { MetadataRoute } from 'next';
import { universities } from '../data/universities';
import { exams } from '../data/exams';
import { scholarships } from '../data/scholarships';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.afterinter.com';

  const staticRoutes = [
    '',
    '/universities',
    '/exams',
    '/scholarships',
    '/tools',
    '/exam-finder',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const universityRoutes = universities.map((uni) => ({
    url: `${baseUrl}/universities/${uni.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const examRoutes = exams.map((exam) => ({
    url: `${baseUrl}/exams/${exam.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const, // Exams change status frequently
    priority: 0.9,
  }));

  const scholarshipRoutes = scholarships.map((s) => ({
    url: `${baseUrl}/scholarships/${s.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...universityRoutes, ...examRoutes, ...scholarshipRoutes];
}