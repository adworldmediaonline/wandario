import { readdirSync, statSync } from 'fs';
import { join } from 'path';
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

export default getPages;
