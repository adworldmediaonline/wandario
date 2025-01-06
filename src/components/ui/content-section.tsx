'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'alternate';
  children?: React.ReactNode;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ContentSection({
  title,
  content,
  icon,
  className,
  variant = 'default',
  children,
}: ContentSectionProps) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden py-16 md:py-24',
        variant === 'alternate' && 'bg-gray-50/50',
        className
      )}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className={cn(
            'mx-auto max-w-4xl space-y-8',
            variant === 'centered' && 'text-center'
          )}
        >
          {/* Header */}
          <div className="space-y-4">
            {icon && (
              <motion.div
                variants={item}
                className="inline-flex items-center space-x-2 text-primary"
              >
                {icon}
              </motion.div>
            )}

            <motion.h2
              variants={item}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sm:text-4xl md:text-5xl"
            >
              {title}
            </motion.h2>

            <motion.div
              variants={item}
              className="prose prose-gray prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          {/* Additional Content */}
          {children && (
            <motion.div variants={item} className="pt-8">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
