import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: React.ReactNode;
  excerpt?: React.ReactNode;
  align?: 'left' | 'center';
  highlight?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  divider?: boolean;
}

export function SectionHeader({
  title,
  excerpt,
  align = 'left',
  highlight,
  className,
  titleClassName,
  descriptionClassName,
  divider = false,
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
          'text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
          'relative',
          titleClassName
        )}
      >
        {highlight && typeof title === 'string' ? (
          <>
            {titleParts[0]}
            <span className="relative inline-block text-primary">
              {highlight}
              <span className="absolute left-0 right-0 bottom-2 h-[0.4em] -z-10 bg-primary/20 rounded-lg" />
              <span className="absolute left-0 right-0 bottom-2 h-[0.25em] -z-10 bg-primary/40 rounded-lg" />
            </span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {excerpt && (
        <p
          className={cn(
            'mt-4 text-lg text-muted-foreground/90 leading-relaxed',
            'max-w-[600px]',
            align === 'center' && 'mx-auto',
            descriptionClassName
          )}
        >
          {excerpt}
        </p>
      )}
      {/* Decorative Line */}
      {divider && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-20 sm:w-24 md:w-28 h-1.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60 mx-auto rounded-full"
        />
      )}
    </div>
  );
}
