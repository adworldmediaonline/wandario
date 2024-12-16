import HeroHeader from '@/components/ui/hero-header';
import { Skeleton } from '@/components/ui/skeleton';

export default function RegionLoading() {
  return (
    <>
      <HeroHeader
        title="Loading Region..."
        description="Please wait while we fetch the region details."
        backgroundImageId="testing/hero-banner"
      />

      <section className="py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
