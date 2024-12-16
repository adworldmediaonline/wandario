'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import type { ICategory } from '@/types';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SectionWithTabsProps {
  categories: ICategory[];
}

export function SectionWithTabs({ categories }: SectionWithTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (categoryName: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (categoryName) {
        params.set('category', categoryName);
      } else {
        params.delete('category');
      }
      router.push(`/regions?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="container space-y-8 px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-3 px-4">
            Explore our handpicked destinations across the globe, each offering
            unique experiences and unforgettable memories.
          </p>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-primary/60 to-primary mx-auto"
        />
      </div>

      {/* Tabs */}
      <motion.div
        className="flex justify-center overflow-x-auto pb-4 sm:pb-0 -mx-4 sm:mx-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-muted/50 backdrop-blur-sm rounded-xl sm:rounded-2xl min-w-full sm:min-w-0">
          <motion.button
            onClick={() => handleCategoryChange('')}
            className={cn(
              'relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300',
              'hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              'whitespace-nowrap flex-shrink-0',
              !currentCategory
                ? 'text-primary'
                : 'text-muted-foreground hover:bg-white/50'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isPending}
          >
            {!currentCategory && (
              <motion.div
                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                layoutId="activeTab"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              All Destinations
            </span>
          </motion.button>

          {categories.map(category => (
            <motion.button
              key={category._id}
              onClick={() => handleCategoryChange(category.name)}
              className={cn(
                'relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300',
                'hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                'whitespace-nowrap flex-shrink-0',
                currentCategory.toLowerCase() === category.name.toLowerCase()
                  ? 'text-primary'
                  : 'text-muted-foreground hover:bg-white/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isPending}
            >
              {currentCategory.toLowerCase() ===
                category.name.toLowerCase() && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-xl shadow-sm"
                  layoutId="activeTab"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
