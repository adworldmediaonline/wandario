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
        'prose max-w-none',
        // Base size and responsive adjustments
        'prose-base sm:prose-lg',
        // Link styles
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-a:transition-colors prose-a:duration-200',
        // Heading styles
        'prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight',
        'prose-headings:text-foreground/90',
        // List styles
        'prose-li:marker:text-primary/70',
        'prose-ul:space-y-1 prose-ol:space-y-1',
        // Code block styles
        'prose-pre:rounded-xl prose-pre:border prose-pre:bg-muted/50',
        'prose-pre:shadow-sm',
        // Inline code styles
        'prose-code:text-primary prose-code:font-medium',
        // Image styles
        '[&_img]:rounded-xl [&_img]:shadow-md [&_img]:border [&_img]:border-border/10',
        '[&_img]:transition-all [&_img]:duration-300 [&_img]:hover:shadow-lg',
        // Figure styles
        '[&_figure]:my-10 [&_figure]:space-y-4',
        '[&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:italic',
        // Table styles
        'prose-table:shadow-sm',
        'prose-th:bg-muted/50 prose-th:text-foreground/70',
        'prose-td:align-middle',
        // Blockquote styles
        'prose-blockquote:border-l-primary prose-blockquote:border-l-3',
        'prose-blockquote:text-muted-foreground prose-blockquote:italic',
        // Custom spacing
        '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        // Custom class
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
