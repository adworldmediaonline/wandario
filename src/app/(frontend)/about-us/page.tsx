import HeroHeader from '@/components/ui/hero-header';
import { Section } from '@/components/ui/section';
import { ContentSection } from '@/components/ui/content-section';
import { Metadata } from 'next';
import GuidelineShowcase from '@/components/ui/guideline-showcase';
import { Heart, Globe2, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Wandario',
  description:
    'Explore the World with Expert Travel Guides. Your journey begins here.',
  alternates: {
    canonical: '/about-us',
  },
};

const guidelines = [
  {
    title: 'Plan in Advance',
    description:
      'Good preparation leads to an easy, stress-free journey. Research and know about your destination. Organize your schedule and prepare for possible setbacks. The better you prepare, the more enjoyable and less stressful the journey will be.',
    icon: 'Calendar',
  },
  {
    title: 'Respect Other Local Cultures',
    description:
      'Live the local way of life and culture. Understanding and respecting cultural differences always enhances your experience, fosters goodwill, and creates meaningful connections with the people you meet along the way.',
    icon: 'Globe',
  },
  {
    title: 'Travel Sustainably',
    description:
      'Reduce your carbon footprint by choosing environmental-friendly choices, local products, and respect for the environment. Sustainable tourism saves the destinations you visit to be enjoyed by others.',
    icon: 'Leaf',
  },
  {
    title: 'Stay Safe',
    description:
      "Be safe by being aware of what's happening locally, secure your valuables, and heed any travel advisories. So being prepared is what's going to let you have a good time without worrying.",
    icon: 'Shield',
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroHeader
        title="Explore the World with Expert Travel Guides"
        excerpt="Unlock secret finds, tips, and itineraries for your next adventure. Your journey begins here."
        backgroundImageId="pexels-ninauhlikova-287240_lsi3is"
        breadcrumb={{
          segments: [
            {
              title: 'About Us',
              href: '/about-us',
            },
          ],
        }}
        actions={{
          primary: {
            label: 'Start Exploring',
            href: '/regions',
          },
          secondary: {
            label: 'Our Guidelines',
            href: '#guidelines',
          },
        }}
      />

      <ContentSection
        title="Welcome to Wandario"
        content="The spirit of adventure ignites every journey; let Wandario be your trusted companion on this incredible ride! For Wandario, life is like travel, for travel is a transformative experience that leaves a lasting impact; it's about the unforgettable paths we take and the life-changing experiences we encounter along the way. Your dynamic, passionate, and spirited travel partner is dedicated to making every moment of your trip nothing short of extraordinary.<br/><br/>Let us make your travel dreams turn into lifelong memories with Wandario – your ultimate travel experts and reliable guide on your wanderlust-filled journey!"
        variant="centered"
        icon={<Heart className="w-6 h-6" />}
        imageId="pexels-quang-nguyen-vinh-222549-2178175_wxu58t"
        imagePosition="right"
      />

      <ContentSection
        title="Our Mission - Empowering Meaningful Journeys"
        content="At Wandario, our goal is to make sure travelers have the right, updated, and comprehensive information available so that every journey turns out to be well-informed and unforgettable. We are searching for the soul of each place, revealing its unique character and uncovering the best-kept secrets of the place. We don't only guide explorers to remarkable places but connect travelers with vibrant cultures that they meet on the way. We want every adventure to be richer, inspiring, and full of discovery with Wandario."
        variant="alternate"
        icon={<Globe2 className="w-6 h-6" />}
        imageId="pexels-alexander-mass-748453803-30021419_ya7sqi"
        imagePosition="left"
      />

      <ContentSection
        title="Our Vision - Building a Connected World"
        content="The dream at Wandario is the vision of travel much more than the mere transport of people to place but a deeply enriching experience that's a world where the traveler, well armed with real and deep knowledge, would finally understand the cultures he or she explores, tread lightly on earth, and leave positively behind all the communities he or she visits. It will help us bridge the cultural divides and bring about more understanding while supporting a more sustainable and harmonious society across the globe."
        icon={<Compass className="w-6 h-6" />}
        imageId="pexels-kovyrina-29330560_gsp5mx"
        imagePosition="right"
      />

      <Section id="guidelines" className="bg-gray-50/50">
        <GuidelineShowcase guidelines={guidelines} />
      </Section>
    </>
  );
}
