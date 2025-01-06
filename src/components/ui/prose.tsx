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
        'prose max-w-none w-full',
        // Base styling
        'prose-base md:prose-lg',
        'text-foreground/80',
        // Content flow
        'prose-p:leading-7 prose-p:text-muted-foreground prose-p:my-3',
        '[&>p:first-of-type]:text-foreground/90 [&>p:first-of-type]:text-lg [&>p:first-of-type]:leading-8',
        // Headings
        'prose-headings:text-foreground/90 prose-headings:font-heading prose-headings:scroll-mt-24',
        'prose-h1:text-2xl md:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:font-bold prose-h1:tracking-tight',
        'prose-h2:text-xl md:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4',
        'prose-h3:text-lg md:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-3',
        // Links
        'prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline',
        'prose-a:underline-offset-4 prose-a:transition-colors hover:prose-a:text-primary/80',
        // Lists
        'prose-ul:my-6 prose-ol:my-6',
        'prose-li:text-muted-foreground prose-li:my-2',
        'prose-li:marker:text-primary/50',
        // Blockquotes
        'prose-blockquote:border-l-primary/20 prose-blockquote:border-l-2',
        'prose-blockquote:text-muted-foreground prose-blockquote:italic prose-blockquote:pl-4',
        'prose-blockquote:my-6',
        // Code blocks
        'prose-code:text-primary/90 prose-code:font-medium prose-code:text-[0.9em]',
        'prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border/40',
        'prose-pre:rounded-md prose-pre:p-4 prose-pre:my-6',
        // Images
        'prose-img:rounded-md prose-img:border prose-img:border-border/10',
        'prose-img:my-6 prose-img:shadow-sm hover:prose-img:shadow-md',
        'prose-img:transition-all prose-img:duration-200',
        // Tables
        'prose-table:my-6 prose-table:w-full prose-table:border prose-table:border-border/30',
        'prose-th:bg-muted/30 prose-th:p-2 prose-th:text-foreground/70',
        'prose-td:p-2 prose-td:text-muted-foreground',
        // Horizontal rules
        'prose-hr:my-8 prose-hr:border-border/30',
        // Custom spacing
        '[&>*]:w-full',
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
