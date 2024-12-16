import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function RegionDestinationsSliderSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-1000">
      {/* Section Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-[280px] sm:h-10 md:h-12" />
        <Skeleton className="h-5 w-[240px] sm:w-[400px]" />
      </div>

      {/* Slider Skeleton */}
      <div className="relative px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'relative overflow-hidden rounded-xl sm:rounded-[20px]',
                'transition-all duration-300',
                'shadow-lg hover:shadow-xl',
                'animate-in fade-in-50 slide-in-from-bottom-4',
                'duration-1000 fill-mode-both',
                { 'delay-150': index === 1 },
                { 'delay-300': index === 2 },
                { 'delay-450': index === 3 }
              )}
            >
              {/* Image Skeleton */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Skeleton className="absolute inset-0 bg-muted/80" />

                {/* Content Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/90"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.95) 100%)',
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-3">
                    {/* Title */}
                    <Skeleton className="h-7 w-3/4 bg-white/20" />
                    {/* Excerpt */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full bg-white/10" />
                      <Skeleton className="h-4 w-2/3 bg-white/10" />
                    </div>
                    {/* Action */}
                    <div className="flex items-center gap-1.5 mt-4">
                      <Skeleton className="h-4 w-4 rounded-full bg-white/20" />
                      <Skeleton className="h-4 w-20 bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="hidden sm:block">
          <Skeleton className="absolute top-1/2 -left-4 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm" />
          <Skeleton className="absolute top-1/2 -right-4 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm" />
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                'h-2 rounded-full bg-white/60',
                index === 0 ? 'w-6' : 'w-2'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
