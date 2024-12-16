import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  highlight?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  title,
  description,
  align = 'left',
  highlight,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const titleText = typeof title === 'string' ? title : '';
  const titleParts = highlight ? titleText.split(highlight) : [titleText];

  return (
    <div
      className={cn(
        'mb-10 max-w-[800px]',
        align === 'center' && 'text-center mx-auto',
        className
      )}
    >
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-[#2A2D32]',
          'relative',
          titleClassName
        )}
      >
        {highlight && typeof title === 'string' ? (
          <>
            {titleParts[0]}
            <span className="relative inline-block">
              {highlight}
              <span className="absolute left-0 right-0 bottom-2 h-[0.4em] -z-10 bg-gradient-to-r from-blue-500/20 via-blue-500/30 to-blue-500/20 rounded-lg blur-[2px]" />
              <span className="absolute left-0 right-0 bottom-2 h-[0.25em] bg-blue-500/30 rounded-lg" />
            </span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-lg text-muted-foreground/90 leading-relaxed',
            'max-w-[600px]',
            align === 'center' && 'mx-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
