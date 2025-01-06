'use client';

import { Section } from '@/components/ui/section';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogShowcaseSkeleton() {
  return (
    <Section className="bg-gray-50/50" container>
      <div className="relative py-24">
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Skeleton className="h-8 w-40 rounded-full" />
          </div>
          <Skeleton className="h-14 w-3/4 mx-auto rounded-lg" />
          <Skeleton className="h-6 w-2/3 mx-auto rounded-lg" />
        </div>

        {/* Blog Grid Skeleton */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
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

        {/* CTA Skeleton */}
        <div className="mt-16 flex justify-center">
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </Section>
  );
}
