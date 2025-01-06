import HeroHeader from '@/components/ui/hero-header';
import CategoryShowcaseSkeleton from '@/components/skeletons/category-showcase-skeleton';

export default function RegionsLoading() {
  return (
    <>
      <HeroHeader
        title="Explore World Regions"
        excerpt="Discover diverse landscapes and rich cultural heritage across different regions of the world. Each destination tells its own unique story through traditions, cuisine, and natural wonders."
        backgroundImageId=" -regions"
      />

      <section id="regions-grid">
        <CategoryShowcaseSkeleton />
      </section>
    </>
  );
}
