import { MetadataRoute } from 'next';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { connectToDatabase } from '@/server/mongoose';
import { Blog, Category, Destination } from '@/server/models';

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

function getPages(dir: string, basePath = ''): string[] {
  const pages: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip special Next.js directories, components, and dynamic route folders
      if (
        entry.startsWith('_') ||
        entry.startsWith('.') ||
        entry.startsWith('[') ||
        entry === 'components' ||
        entry === 'api'
      ) {
        continue;
      }

      // Handle route groups
      let newBasePath = basePath;
      if (entry === '(frontend)') {
        // Keep the basePath as is for frontend group
        newBasePath = basePath;
      } else if (entry.startsWith('(') && entry.endsWith(')')) {
        // Skip other route groups
        continue;
      } else {
        // Regular directory - add to path
        newBasePath = join(basePath, entry);
      }

      pages.push(...getPages(fullPath, newBasePath));
    } else if (entry === 'page.tsx' || entry === 'page.ts') {
      // Convert path to route
      let route = basePath.replace(/\\/g, '/');

      // Clean up the route
      route = route.replace(/^\/+/, ''); // Remove leading slashes
      route = route || '/'; // Root path for empty string

      // Add leading slash if not root
      route = route === '/' ? route : `/${route}`;

      // Skip dynamic routes and don't add duplicate routes
      if (!route.includes('[') && !pages.includes(route)) {
        pages.push(route);
      }
    }
  }

  return pages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://www.wandario.com';

  // Get static pages
  const appDir = 'src/app';
  const frontendDir = join(appDir, '(frontend)');
  const pages = getPages(frontendDir);

  // Filter out unwanted routes
  const validPages = pages.filter(
    route =>
      !route.includes('admin') &&
      !route.includes('api') &&
      !route.includes('auth') &&
      !route.includes('dashboard') &&
      !route.includes('server-sitemap.xml') &&
      !route.includes('not-found') &&
      !route.includes('loading') &&
      !route.includes('error') &&
      !route.includes('thank-you')
  );

  // Create sitemap entries for static pages
  const staticPages = validPages.map(route => {
    const url = `${baseUrl}${route}`;

    // Set priorities based on route type
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
      changeFrequency = 'weekly';
    } else if (route.match(/^\/(about-us|privacy|terms)$/)) {
      priority = 0.6;
      changeFrequency = 'monthly';
    } else if (route.match(/^\/(destination|region|blog)$/)) {
      priority = 0.8;
      changeFrequency = 'weekly';
    }

    return {
      url,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  // Get dynamic pages from database
  try {
    await connectToDatabase();

    // Fetch all dynamic data
    const [categories, destinations, blogs] = await Promise.all([
      Category.find({}, 'slug createdAt'),
      Destination.find({}, 'slug updatedAt'),
      Blog.find({}, 'slug updatedAt'),
    ]);

    // Create sitemap entries for dynamic pages
    const dynamicPages = [
      // Category entries (regions)
      ...categories.map(category => ({
        url: `${baseUrl}/region/${category.slug}`,
        lastModified: new Date(category.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),

      // Destination entries
      ...destinations.map(destination => ({
        url: `${baseUrl}/destination/${destination.slug}`,
        lastModified: new Date(destination.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),

      // Blog entries
      ...blogs.map(blog => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt),
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
