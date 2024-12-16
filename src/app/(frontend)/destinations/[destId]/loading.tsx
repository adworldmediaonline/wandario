import DestinationContentSkeleton from '@/components/skeletons/destination-content-skeleton';
import HeroHeader from '@/components/ui/hero-header';

export default function DestinationLoading() {
  return (
    <>
      <HeroHeader
        title="Loading Destination..."
        excerpt="Please wait while we fetch the destination details."
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
