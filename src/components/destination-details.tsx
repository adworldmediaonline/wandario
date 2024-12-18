'use client';

import DestinationContent from '@/components/destination-content';
import HeroHeader from '@/components/ui/hero-header';
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
      <HeroHeader
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
        title={destination.name}
        excerpt={destination.excerpt}
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

      <Section id="content" container>
        <DestinationContent destination={destination} />
      </Section>
    </>
  );
}
