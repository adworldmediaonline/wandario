import { promises as fs } from 'fs';
import { join } from 'path';

async function getPages(dir: string, basePath = ''): Promise<string[]> {
  const pages: string[] = [];
  const fullPath = join(process.cwd(), dir);

  try {
    const entries = await fs.readdir(fullPath, { withFileTypes: true });

    for (const entry of entries) {
      const relativePath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip special Next.js directories, components, and dynamic route folders
        if (
          entry.name.startsWith('_') ||
          entry.name.startsWith('.') ||
          entry.name.startsWith('[') ||
          entry.name === 'components' ||
          entry.name === 'api'
        ) {
          continue;
        }

        // Handle route groups
        let newBasePath = basePath;
        if (entry.name === '(frontend)') {
          // Keep the basePath as is for frontend group
          newBasePath = basePath;
        } else if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
          // Skip other route groups
          continue;
        } else {
          // Regular directory - add to path
          newBasePath = join(basePath, entry.name);
        }

        // Recursively get pages from subdirectory
        const subPages = await getPages(relativePath, newBasePath);
        pages.push(...subPages);
      } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
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
  } catch (error) {
    console.error(`Error reading directory ${fullPath}:`, error);
    return [];
  }
}

export default getPages;
