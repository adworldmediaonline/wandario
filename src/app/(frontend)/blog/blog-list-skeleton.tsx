import { Section } from '@/components/ui/section';

export default function BlogListSkeleton() {
  return (
    <Section className="py-16 lg:py-20">
      <div className="container">
        {/* Filters Skeleton */}
        <div className="relative mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="h-12 flex-1 animate-pulse rounded-full bg-gray-200" />
              <div className="h-12 w-full sm:w-[200px] animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Results Summary Skeleton */}
        <div className="mb-8 text-center">
          <div className="mx-auto h-6 w-48 animate-pulse rounded-full bg-gray-200" />
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              {/* Image Skeleton */}
              <div className="relative aspect-[16/10] animate-pulse bg-gray-200">
                {/* Category Badge Skeleton */}
                <div className="absolute left-4 top-4 h-6 w-24 animate-pulse rounded-full bg-white/90" />
              </div>

              {/* Content Skeleton */}
              <div className="flex flex-1 flex-col p-6 space-y-4">
                {/* Title Skeleton */}
                <div className="space-y-2">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>

                {/* Excerpt Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                </div>

                {/* Metadata Skeleton */}
                <div className="mt-auto flex items-center gap-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
