import HeroHeader from '@/components/ui/hero-header';
import { getDestinationById } from '@/server/db/destination';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import DestinationContent from '@/components/destination-content';
import DestinationContentSkeleton from '@/components/skeletons/destination-content-skeleton';

export default async function DestinationDetailsPage(props: {
  params: Promise<{ destId: string }>;
}) {
  const params = await props.params;
  const destination = await getDestinationById(params.destId);

  if (!destination) {
    notFound();
  }

  return (
    <>
      <HeroHeader
        breadcrumb={{
          segments: [
            {
              title: 'Destinations',
              href: '/destinations',
            },
            {
              title: destination.name,
              href: `/destinations/${params.destId}`,
            },
          ],
        }}
        title={destination.name}
        description={destination.excerpt}
        backgroundImageId={
          destination.thumbnail?.public_id || 'testing/hero-banner'
        }
        actions={{
          primary: {
            label: 'View Details',
            href: '#content',
          },
          secondary: {
            label: 'View Map',
            href: '#map',
          },
        }}
      />

      <section id="content" className="py-20">
        <div className="container">
          <Suspense fallback={<DestinationContentSkeleton />}>
            <DestinationContent destination={destination} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
