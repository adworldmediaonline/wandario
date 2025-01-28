import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/server/mongoose';
import { Blog, Category, Destination } from '@/server/models';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://www.wandario.com';
  const currentDate = new Date().toISOString();

  // Define static routes
  const staticRoutes = [
    '/',
    '/about-us',
    '/destination',
    '/region',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/disclaimer',
    '/affiliate-disclosure',
    '/legal-information',
    '/faq',
  ];

  // Create sitemap entries for static pages
  const staticPages = staticRoutes.map(route => {
    let priority = 0.7;
    let changeFrequency:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never' = 'weekly';

    if (route === '/') {
      priority = 1.0;
      changeFrequency = 'daily';
    } else if (route.match(/^\/(about-us|privacy|terms|faq)$/)) {
      priority = 0.6;
      changeFrequency = 'monthly';
    } else if (route.match(/^\/(destination|region|blog)$/)) {
      priority = 0.8;
      changeFrequency = 'weekly';
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
    };
  });

  // Get dynamic pages from database
  try {
    await connectToDatabase();

    // Fetch all dynamic data
    const [categories, destinations, blogs] = await Promise.all([
      Category.find({ status: 'active' }, 'slug updatedAt'),
      Destination.find({ status: 'active' }, 'slug updatedAt'),
      Blog.find({ status: 'active' }, 'slug updatedAt'),
    ]);

    // Create sitemap entries for dynamic pages
    const dynamicPages = [
      // Category entries (regions)
      ...categories.map(category => ({
        url: `${baseUrl}/region/${category.slug}`,
        lastModified: category.updatedAt?.toISOString() || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),

      // Destination entries
      ...destinations.map(destination => ({
        url: `${baseUrl}/destination/${destination.slug}`,
        lastModified: destination.updatedAt?.toISOString() || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),

      // Blog entries
      ...blogs.map(blog => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.updatedAt?.toISOString() || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
    ];

    // Combine static and dynamic pages
    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return only static pages if database connection fails
    return staticPages;
  }
}
