import HeroHeader from '@/components/ui/hero-header';
import { getDestinations } from '@/server/db/destination';
import { Suspense } from 'react';

import { EmptyState } from '@/components/ui/empty-state';
import { Compass } from 'lucide-react';
import DestinationsShowcaseSkeleton from '@/components/skeletons/destinations-showcase-skeleton';
import DestinationsShowcase from '@/components/destinations-showcase';
import { Section } from '@/components/ui/section';

export default async function DestinationsPage(props: {
  searchParams: Promise<{ search: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.search ?? '';
  const currentOffset = parseInt(searchParams.offset ?? '0', 10);

  const { destinations, totalDestinations } = await getDestinations({
    search,
    offset: currentOffset.toString(),
  });

  const hasDestinations = destinations.length > 0;

  return (
    <>
      <HeroHeader
        breadcrumb={{
          segments: [
            {
              title: 'Destinations',
              href: '/destinations',
            },
          ],
        }}
        title="Explore Amazing Destinations"
        excerpt="Discover breathtaking locations and unforgettable experiences across the globe. Each destination offers unique adventures waiting to be explored."
        backgroundImageId=""
        actions={{
          primary: {
            label: 'Start Exploring',
            href: '#destinations-grid',
          },
          secondary: {
            label: 'View Map',
            href: '#map',
          },
        }}
      />

      <Section id="destinations-grid" container>
        <Suspense fallback={<DestinationsShowcaseSkeleton />}>
          {hasDestinations ? (
            <DestinationsShowcase
              destinations={destinations}
              totalDestinations={totalDestinations}
            />
          ) : (
            <EmptyState
              icon={Compass}
              title="No Destinations Found"
              description={
                search
                  ? `No destinations found for "${search}". Try different search terms.`
                  : "We're currently adding new destinations. Check back soon!"
              }
              action={{
                label: 'Clear Search',
                href: '/destinations',
              }}
            />
          )}
        </Suspense>
      </Section>
    </>
  );
}
