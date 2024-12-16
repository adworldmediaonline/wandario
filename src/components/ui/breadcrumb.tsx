import * as React from 'react';
import { ChevronRight, HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BreadcrumbSegment {
  title: string;
  href: string;
}

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  segments: BreadcrumbSegment[];
  separator?: React.ReactNode;
  className?: string;
}

export type { BreadcrumbSegment };

export function Breadcrumb({
  segments,
  separator = <ChevronRight className="h-4 w-4 text-white/50" />,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full',
        className
      )}
      {...props}
    >
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            className="text-white/80 hover:text-white transition-colors"
          >
            <HomeIcon className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {segments.map((segment, index) => (
          <React.Fragment key={segment.href}>
            {separator}
            <li>
              <Link
                href={segment.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  index === segments.length - 1
                    ? 'text-white pointer-events-none'
                    : 'text-white/80 hover:text-white'
                )}
                aria-current={
                  index === segments.length - 1 ? 'page' : undefined
                }
              >
                {segment.title}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
