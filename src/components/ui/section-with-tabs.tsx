'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import type { ICategory } from '@/types';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';

interface SectionWithTabsProps {
  categories: ICategory[];
  type?: 'regions' | 'destinations';
}

export function SectionWithTabs({
  categories,
  type = 'regions',
}: SectionWithTabsProps) {
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
      router.push(`/${type}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <SectionHeader
          title="Popular Destinations Around the World"
          excerpt="Explore handpicked destinations from pristine beaches to historic cities. Our curated selection features the most sought-after locations, complete with local insights and travel tips for an authentic experience."
          align="center"
          highlight="Popular Destinations"
          className="mb-8"
          titleClassName="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
          descriptionClassName="max-w-3xl"
          divider={true}
        />
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative overflow-x-auto mask-fade-edges">
          <div className="inline-flex items-center gap-2 p-2 bg-muted/40 backdrop-blur-sm rounded-2xl min-w-full sm:min-w-0 border border-muted-foreground/10">
            <motion.button
              onClick={() => handleCategoryChange('')}
              className={cn(
                'relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                'hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'whitespace-nowrap flex-shrink-0',
                !currentCategory
                  ? 'text-primary'
                  : 'text-muted-foreground hover:bg-white/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isPending}
              role="tab"
              aria-selected={!currentCategory}
              aria-controls="destination-panel"
            >
              {!currentCategory && (
                <motion.div
                  className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                  layoutId="activeTab"
                  transition={{
                    type: 'spring',
                    bounce: 0.15,
                    duration: 0.6,
                  }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                All
              </span>
            </motion.button>

            {categories.map(category => (
              <motion.button
                key={category._id}
                onClick={() => handleCategoryChange(category.name)}
                className={cn(
                  'relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                  'hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  'whitespace-nowrap flex-shrink-0',
                  currentCategory.toLowerCase() === category.name.toLowerCase()
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-white/50'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isPending}
                role="tab"
                aria-selected={
                  currentCategory.toLowerCase() === category.name.toLowerCase()
                }
                aria-controls="destination-panel"
              >
                {currentCategory.toLowerCase() ===
                  category.name.toLowerCase() && (
                  <motion.div
                    className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                    layoutId="activeTab"
                    transition={{
                      type: 'spring',
                      bounce: 0.15,
                      duration: 0.6,
                    }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .mask-fade-edges {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }
      `}</style>
    </div>
  );
}
