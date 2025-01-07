'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  textClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
}

export function Logo({
  className,
  textClassName,
  size = 'sm',
  href = '/',
  onClick,
}: LogoProps) {
  const sizeClasses = {
    sm: {
      logo: 'text-xl h-8 w-8',
      text: 'text-lg',
    },
    md: {
      logo: 'text-2xl h-10 w-10',
      text: 'text-xl',
    },
    lg: {
      logo: 'text-3xl h-12 w-12',
      text: 'text-2xl',
    },
  };

  return (
    <Link
      href={href}
      className={cn('flex items-center focus:outline-none group', className)}
      onClick={onClick}
    >
      <div className="flex items-center gap-[0.135rem]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10,
            duration: 0.6,
          }}
          className="relative"
        >
          <span
            className={cn(
              'font-bold text-white',
              sizeClasses[size].logo,
              'inline-flex items-center justify-center rounded-full',
              'bg-[hsl(217,91%,60%)]',
              'transform transition-transform duration-300 group-hover:scale-105'
            )}
          >
            W
          </span>
        </motion.div>
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className={cn(
            'font-bold tracking-tight',
            sizeClasses[size].text,
            'bg-clip-text text-transparent bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(217,91%,60%)]',
            'transform transition-transform duration-300 group-hover:translate-x-0.5',
            textClassName
          )}
        >
          andario
        </motion.span>
      </div>
    </Link>
  );
}
