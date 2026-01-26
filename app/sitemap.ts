import { MetadataRoute } from 'next';
import { universities } from '../data/universities';
import { exams } from '../data/exams';
import { scholarships } from '../data/scholarships';

const BASE_URL = 'https://afterinter.com'; // Replace with actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/universities',
    '/exams',
    '/scholarships',
    '/tools',
    '/exam-finder',
    '/saved',
    '/compare',
    '/help',
    '/privacy',
    '/terms',
    '/disclaimer',
  ].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const universityRoutes = universities.map(uni => ({
    url: `${BASE_URL}/universities/${uni.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const examRoutes = exams.map(exam => ({
    url: `${BASE_URL}/exams/${exam.id}`,
    lastModified: new Date(exam.lastVerified || new Date()),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  const scholarshipRoutes = scholarships.map(schol => ({
    url: `${BASE_URL}/scholarships/${schol.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...universityRoutes, ...examRoutes, ...scholarshipRoutes];
}