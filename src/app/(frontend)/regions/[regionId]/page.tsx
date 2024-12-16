import HeroHeader from '@/components/ui/hero-header';
import { getCategoryById } from '@/server/db/category';
import { EmptyState } from '@/components/ui/empty-state';
import { Globe2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { RegionDestinationsSlider } from '@/components/region-destinations-slider';
import { Suspense } from 'react';
import RegionDestinationsSliderSkeleton from '@/components/skeletons/region-destinations-skeleton';

export default async function RegionDetailsPage(props: {
  params: Promise<{ regionId: string }>;
}) {
  const params = await props.params;
  const category = await getCategoryById(params.regionId);

  if (!category) {
    notFound();
  }

  const hasDestinations = category.destinations?.length > 0;

  return (
    <>
      <HeroHeader
        breadcrumb={{
          segments: [
            {
              title: 'Regions',
              href: '/regions',
            },
            {
              title: category.name,
              href: `/regions/${params.regionId}`,
            },
          ],
        }}
        title={category.name}
        description={category.excerpt}
        backgroundImageId={
          category.thumbnail?.public_id || 'testing/hero-banner'
        }
        actions={{
          primary: {
            label: 'Explore Destinations',
            href: '#destinations',
          },
          secondary: {
            label: 'View Map',
            href: '#map',
          },
        }}
      />

      <section id="destinations" className="py-20">
        <div className="container">
          <Suspense fallback={<RegionDestinationsSliderSkeleton />}>
            {hasDestinations ? (
              <RegionDestinationsSlider
                destinations={category.destinations}
                title={`Explore ${category.name}`}
              />
            ) : (
              <EmptyState
                icon={Globe2}
                title="No Destinations Available"
                description={`We're currently adding exciting destinations to ${category.name}. Check back soon for updates!`}
                action={{
                  label: 'Explore Other Regions',
                  href: '/regions',
                }}
              />
            )}
          </Suspense>
        </div>
      </section>
    </>
  );
}
