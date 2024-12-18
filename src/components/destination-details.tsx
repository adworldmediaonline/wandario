'use client';

import DestinationContent from '@/components/destination-content';
import HeroHeaderV2 from '@/components/ui/hero-header-v2';
import type { IDestination } from '@/types';
import { Section } from './ui/section';

interface DestinationDetailsProps {
  destination: IDestination;
}

export default function DestinationDetails({
  destination,
}: DestinationDetailsProps) {
  return (
    <>
      <HeroHeaderV2
        breadcrumb={{
          segments: [
            {
              title: 'Destinations',
              href: '/destinations',
            },
            {
              title: destination.name,
              href: `/destinations/${destination.slug}`,
            },
          ],
        }}
        title={destination?.heading}
        excerpt={destination?.excerpt}
        backgroundImageId={
          destination.images[0]?.public_id || destination.thumbnail?.public_id
        }
      />

      <Section id="content" container className="pt-2 pb-20">
        <DestinationContent destination={destination} />
      </Section>
    </>
  );
}
