import HeroHeader from '@/components/ui/hero-header';
import { getCategories } from '@/server/db/category';
import CategoryShowcase from '@/components/category-showcase';
import { Suspense } from 'react';
import CategoryShowcaseSkeleton from '@/components/skeletons/category-showcase-skeleton';
import { DestinationsSlider } from '@/components/destinations-slider';

export default async function RegionsPage(props: {
  searchParams: Promise<{ category: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category ?? '';
  const currentOffset = parseInt(searchParams.offset ?? '0', 10);

  const { categories } = await getCategories({
    offset: currentOffset.toString(),
  });
  console.log(category);

  return (
    <>
      <HeroHeader
        breadcrumb={{
          segments: [
            {
              title: 'Regions',
              href: '/regions',
            },
          ],
        }}
        title="Explore World Regions"
        description="Discover diverse landscapes and rich cultural heritage across different regions of the world. Each destination tells its own unique story through traditions, cuisine, and natural wonders."
        backgroundImageId="testing/hero-banner-regions"
        actions={{
          primary: {
            label: 'Start Exploring',
            href: '#regions-grid',
          },
          secondary: {
            label: 'View Map',
            href: '#map',
          },
        }}
      />

      {/* Regions Grid Section */}
      <section id="regions-grid">
        <Suspense fallback={<CategoryShowcaseSkeleton />}>
          <CategoryShowcase categories={categories} />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Suspense fallback={<CategoryShowcaseSkeleton />}>
            <DestinationsSlider categories={categories} category={category} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
