import HeroHeader from '@/components/ui/hero-header';
import { getCategories } from '@/server/db/category';
import CategoryShowcase from '@/components/category-showcase';
import { Suspense } from 'react';
import CategoryShowcaseSkeleton from '@/components/skeletons/category-showcase-skeleton';
import { DestinationsSlider } from '@/components/destinations-slider';
import { EmptyState } from '@/components/ui/empty-state';
import { Globe2 } from 'lucide-react';

export default async function RegionsPage(props: {
  searchParams: Promise<{ category: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category ?? '';
  const currentOffset = parseInt(searchParams.offset ?? '0', 10);

  const { categories } = await getCategories({
    offset: currentOffset.toString(),
  });

  const hasCategories = categories.length > 0;
  const hasDestinations = categories.some(cat => cat.destinations?.length > 0);

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
        excerpt="Discover diverse landscapes and rich cultural heritage across different regions of the world. Each destination tells its own unique story through traditions, cuisine, and natural wonders."
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
          {hasCategories ? (
            <CategoryShowcase categories={categories} />
          ) : (
            <EmptyState
              icon={Globe2}
              title="No Regions Available"
              description="We're currently expanding our coverage of world regions. Please check back soon for updates!"
              action={{
                label: 'Explore Other Options',
                href: '/',
              }}
            />
          )}
        </Suspense>
      </section>

      {/* Destinations Section */}
      <section className="py-20">
        <div className="container">
          <Suspense fallback={<CategoryShowcaseSkeleton />}>
            {hasDestinations ? (
              <DestinationsSlider categories={categories} category={category} />
            ) : (
              <EmptyState
                icon={Globe2}
                title="No Destinations Yet"
                description="We're working on adding exciting destinations. Stay tuned for updates!"
                className="min-h-[300px]"
              />
            )}
          </Suspense>
        </div>
      </section>
    </>
  );
}
