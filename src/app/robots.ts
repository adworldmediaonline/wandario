import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL || 'https://www.wandario.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/auth/', '/dashboard/', '/thank-you/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
