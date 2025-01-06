'use client';

import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogListSkeleton() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        {/* Filters Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-full sm:w-[180px]" />
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              {/* Image Skeleton */}
              <Skeleton className="w-full aspect-[16/10]" />

              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-5 w-32 rounded-lg" />
                </div>
                <Skeleton className="h-7 w-full rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
                <Skeleton className="h-5 w-24 rounded-lg" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-12 flex justify-center">
          <Skeleton className="h-10 w-72 rounded-lg" />
        </div>
      </div>
    </section>
  );
}
