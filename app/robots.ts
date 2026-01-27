import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/saved'],
    },
    sitemap: 'https://www.afterinter.com/sitemap.xml',
  };
}