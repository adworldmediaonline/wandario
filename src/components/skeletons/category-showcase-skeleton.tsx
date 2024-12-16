export default function CategoryShowcaseSkeleton() {
  return (
    <section className="py-20">
      <div className="container">
        {/* Header Skeleton */}
        <div className="space-y-4 max-w-2xl mx-auto text-center">
          <div className="h-10 w-2/3 bg-muted rounded-lg animate-pulse mx-auto" />
          <div className="h-4 w-3/4 bg-muted rounded-lg animate-pulse mx-auto" />
        </div>

        {/* Grid Skeleton */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative bg-muted rounded-[32px] overflow-hidden animate-pulse"
            >
              <div className="aspect-[3/4] w-full">
                <div className="absolute top-6 right-6">
                  <div className="w-20 h-8 bg-white/20 rounded-full" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 space-y-3">
                  <div className="h-8 w-3/4 bg-white/20 rounded-lg" />
                  <div className="h-4 w-full bg-white/20 rounded-lg" />
                  <div className="h-4 w-2/3 bg-white/20 rounded-lg" />
                  <div className="h-10 w-32 bg-white/20 rounded-full mt-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
