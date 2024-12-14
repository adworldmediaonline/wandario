export default function CategoryShowcaseSkeleton() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-muted rounded-lg animate-pulse" />
              <div className="h-4 w-48 bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="hidden sm:block h-9 w-24 bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[4/5] rounded-2xl bg-muted animate-pulse" />
                <div className="h-4 w-3/4 bg-muted rounded-lg animate-pulse" />
                <div className="h-3 w-1/2 bg-muted rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
