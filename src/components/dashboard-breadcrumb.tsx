'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbSegment {
  label: string;
  path: string;
}

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const segments: BreadcrumbSegment[] = pathSegments.map((segment, index) => ({
    label: segment,
    path: '/' + pathSegments.slice(0, index + 1).join('/'),
  }));

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {segments.map((segment, index) => (
          <li key={segment.path}>
            {index < segments.length - 1 ? (
              <>
                <Link
                  href={segment.path}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {segment.label}
                </Link>
                <span className="mx-2">/</span>
              </>
            ) : (
              <span className="text-gray-900">{segment.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
