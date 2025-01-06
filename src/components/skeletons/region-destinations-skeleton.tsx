import { Section } from '../ui/section';

export default function RegionDestinationsSkeleton() {
  return (
    <Section className="relative overflow-hidden" container>
      {/* Header Skeleton */}
      <div className="relative text-center max-w-3xl mx-auto mb-20">
        <div className="inline-block mb-3">
          <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="h-16 w-3/4 mx-auto bg-gray-200 rounded-lg mb-6 animate-pulse" />
        <div className="h-12 w-2/3 mx-auto bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="relative">
            <div className="aspect-[4/3] rounded-[2rem] bg-gray-200 animate-pulse">
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <div className="h-8 w-1/2 bg-gray-300 rounded-full mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-300 rounded" />
                  <div className="h-4 w-3/4 bg-gray-300 rounded" />
                  <div className="h-4 w-1/2 bg-gray-300 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
