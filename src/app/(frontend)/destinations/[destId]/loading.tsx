import HeroHeader from '@/components/ui/hero-header';
import DestinationContentSkeleton from '@/components/skeletons/destination-content-skeleton';

export default function DestinationLoading() {
  return (
    <>
      <HeroHeader
        title="Loading Destination..."
        description="Please wait while we fetch the destination details."
        backgroundImageId="testing/hero-banner"
      />

      <section className="py-20">
        <div className="container">
          <DestinationContentSkeleton />
        </div>
      </section>
    </>
  );
}
