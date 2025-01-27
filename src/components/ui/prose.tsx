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
        'prose-sm sm:prose-base font-source-serif',
        'text-foreground/80',
        // Content flow
        'prose-p:leading-relaxed prose-p:text-muted-foreground',
        '[&>p:first-of-type]:text-foreground/90 [&>p:first-of-type]:text-base',
        // Headings
        'prose-headings:text-foreground prose-headings:font-poppins prose-headings:scroll-mt-24',
        'prose-h1:text-[2rem] sm:prose-h1:text-[2.5rem] prose-h1:font-medium prose-h1:tracking-tight',
        'prose-h1:border-b prose-h1:border-border prose-h1:pb-2 prose-h1:mb-5',
        'prose-h2:text-[1.65rem] sm:prose-h2:text-[2rem] prose-h2:font-medium prose-h2:text-primary',
        'prose-h3:text-[1.35rem] sm:prose-h3:text-[1.65rem] prose-h3:font-medium prose-h3:text-primary/90',
        // Links
        'prose-a:text-primary prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-transparent',
        'hover:prose-a:border-primary hover:prose-a:text-primary',
        // Lists
        'prose-ul:my-3 prose-ol:my-3',
        'prose-li:text-muted-foreground prose-li:leading-normal prose-li:font-source-serif',
        'prose-li:text-[0.9375rem] sm:prose-li:text-base',
        'prose-li:marker:text-primary',
        // Blockquotes
        'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted',
        'prose-blockquote:text-foreground/90 prose-blockquote:italic prose-blockquote:shadow',
        'prose-blockquote:text-base prose-blockquote:my-6 prose-blockquote:font-source-serif',
        // Code blocks
        'prose-code:text-primary prose-code:font-medium prose-code:text-[0.875em]',
        'prose-code:bg-muted prose-code:border prose-code:border-border',
        'prose-pre:bg-muted prose-pre:border prose-pre:border-border',
        'prose-pre:rounded-lg prose-pre:shadow prose-pre:p-4 prose-pre:my-4',
        // Images
        'prose-img:rounded-xl prose-img:border prose-img:border-border',
        'prose-img:my-6 prose-img:shadow-md hover:prose-img:shadow-lg',
        'prose-img:transition-all prose-img:duration-300',
        // Tables
        'prose-table:my-6 prose-table:border prose-table:border-border',
        'prose-table:rounded-lg prose-table:overflow-hidden',
        'prose-th:bg-muted prose-th:uppercase prose-th:text-xs prose-th:tracking-wider prose-th:font-poppins',
        'prose-td:p-3 prose-td:text-muted-foreground prose-td:font-source-serif',
        // Horizontal rules
        'prose-hr:my-8 prose-hr:border-t-2 prose-hr:border-border/50',
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
