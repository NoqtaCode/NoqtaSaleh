import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://badrpalm.com').replace(/\/$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/login/', '/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/images/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
