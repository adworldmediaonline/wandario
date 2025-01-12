import DestinationContent from '@/components/destination-content';
import DestinationFAQ from '@/components/destination-faq';
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
              title: 'Destination',
              href: '/destination',
            },
            {
              title: destination.name,
              href: `/destination/${destination.slug}`,
            },
          ],
        }}
        title={destination?.heading}
        excerpt={destination?.excerpt}
        backgroundImageId={
          destination.images[0]?.public_id || destination.thumbnail?.public_id
        }
        navigationItems={[
          { id: 'content', label: 'Overview' },
          { id: 'faqs', label: 'FAQs' },
          // Add other navigation items as needed
        ]}
      />

      <Section id="content" className="py-3 pb-5" container>
        <DestinationContent destination={destination} />
      </Section>

      {destination.faqs?.length > 0 && (
        <DestinationFAQ faqs={destination.faqs} />
      )}
    </>
  );
}
