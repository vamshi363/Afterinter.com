
import { MetadataRoute } from 'next';
import { universities } from '../data/universities';
import { exams } from '../data/exams';
import { scholarships } from '../data/scholarships';
import { blogPosts } from '../data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.afterinter.com';

  const staticRoutes