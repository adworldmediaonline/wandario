import DestinationContentSkeleton from '@/components/skeletons/destination-content-skeleton';
import { getDestinationById } from '@/server/db/destination';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import DestinationDetails from '@/components/destination-details';

export default async function DestinationDetailsPage(props: {
  params: Promise<{ destId: string }>;
}) {
  const params = await props.params;
  const destination = await getDestinationById(params.destId);

  if (!destination) {
    notFound();
  }

  return (
    <Suspense fallback={<DestinationContentSkeleton />}>
      <DestinationDetails destination={destination} />
    </Suspense>
  );
}
