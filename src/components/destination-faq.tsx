'use client';

import { FAQ } from '@/components/ui/faq';
import type { IFAQ } from '@/types';

interface DestinationFAQProps {
  faqs: IFAQ[];
}

export default function DestinationFAQ({ faqs }: DestinationFAQProps) {
  return (
    <FAQ
      id="faqs"
      title="Frequently Asked Questions"
      description={`Find answers to common questions about ${
        faqs.length > 0 ? 'this destination' : 'our destinations'
      }`}
      items={faqs}
    />
  );
}
