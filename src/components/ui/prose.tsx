import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Prose({
  children,
  className,
  as: Component = 'div',
  ...props
}: ProseProps) {
  return (
    <Component
      className={cn(
        'prose prose-gray dark:prose-invert max-w-none',
        // Size variations
        'prose-lg lg:prose-xl',
        // Link styles
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        // Heading styles
        'prose-headings:scroll-mt-28 prose-headings:font-bold prose-headings:tracking-tight',
        // List styles
        'prose-li:marker:text-muted-foreground',
        // Code block styles
        'prose-pre:rounded-lg prose-pre:border',
        // Image styles
        '[&_img]:rounded-lg [&_img]:max-h-[32rem]  [&_img]:object-contain',
        '[&_figure]:flex [&_figure]:flex-col [&_figure]:items-center',
        // Custom spacing
        '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
