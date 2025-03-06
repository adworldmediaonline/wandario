import HeroHeader from '@/components/ui/hero-header';
import { Section } from '@/components/ui/section';
import { ContentSection } from '@/components/ui/content-section';
import { Metadata } from 'next';
import GuidelineShowcase from '@/components/ui/guideline-showcase';
import { Heart, Globe2, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Wandario: Transforming Journeys with Expert Travel Insights',
  description:
    'Learn about Wandario, your dedicated travel partner. Discover our mission to empower meaningful journeys and our vision of connecting the world through enriching travel experiences.',
  keywords:
    'About Wandario, Travel expertise, Trusted travel guide, Passion for travel, Travel company values, Innovative travel experiences, How Wandario transforms your travel dreams, Meet your ultimate travel companion, Discover the mission of Wandario',
  alternates: {
    canonical: '/about-us',
  },
};

const guidelines = [
  {
    title: 'Plan in Advance',
    description:
      'Adequate planning guarantees a flawless, stress-free journey. Spend some time learning about and becoming acquainted with your trip location. A well-considered vacation schedule results in less worry and more fun.',
    icon: 'Calendar',
  },
  {
    title: 'Respect Other Local Cultures',
    description:
      'Live the local way of life and culture. Knowing and appreciating cultural variations always improves your experience, builds goodwill, and helps you to establish close relationships with the individuals you come across along the road.',
    icon: 'Globe',
  },
  {
    title: 'Travel Consciously',
    description:
      'Choose eco-friendly options, locally produced goods, and environmental respect to help to lower your carbon footprint. Sustainable travel preserves the places you visit so others may enjoy them.',
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
            href: '/region',
          },
          // secondary: {
          //   label: 'Our Guidelines',
          //   href: '#guidelines',
          // },
        }}
      />

      <ContentSection
        title="Welcome to Wandario"
        content="Embark on an unforgettable voyage with Wandario at your side, where excitement and adventure await at every turn. Wandario compares life to a journey because travel is an impactful and life-altering event; it's about the remarkable routes we take and the life-altering things we encounter on our travels. Every minute of your holiday will be exceptional thanks to your vivacious, passionate travel buddy.<br/><br/>With Wandario, your best travel guru and dependable guide on your wanderlust-driven path, let your vacation fantasies become lifetime memories!"
        variant="centered"
        icon={<Heart className="w-6 h-6" />}
        imageId="pexels-quang-nguyen-vinh-222549-2178175_wxu58t"
        imagePosition="right"
      />

      <ContentSection
        title="Our Mission - Empowering Meaningful Journeys"
        content="Every journey should be informed and unforgettable; at Wandario, we work to bring visitors the most current and comprehensive knowledge available to help them achieve this. Every place has a different character, so by conducting extensive research, we want to know everything about it. On top of leading adventurers to incredible locations, we also put them in. Uch with the fascinating locals they may encounter along the road. Wandario should enrich, inspire, and fill every trip with discovery."
        variant="alternate"
        icon={<Globe2 className="w-6 h-6" />}
        imageId="pexels-alexander-mass-748453803-30021419_ya7sqi"
        imagePosition="left"
      />

      <ContentSection
        title="Our Vision - Building a Connected World"
        content="At Wandario, we see travel as a wealthy experience rather than as a way of getting people to various locations. In the future, we see travellers with real and profound knowledge who will practice earthly stewardship, have a great awareness of the cultures they come across, and help every community they pass by. It will enable us to reduce cultural gaps and promote greater understanding and thus create a more harmonic and sustainable community all around."
        icon={<Compass className="w-6 h-6" />}
        imageId="pexels-kovyrina-29330560_gsp5mx"
        imagePosition="right"
      />

      <Section id="guidelines" className="bg-gray-50/50">
        <GuidelineShowcase guidelines={guidelines} />
      </Section>
      <Section>
        <h3 className="text-2xl font-bold text-primary">Wandario</h3>
        <p>
          Wandario is your reliable partner in discovering the world's most
          enchanting places. We craft genuine travel experiences, linking
          explorers with memorable journeys and vibrant local cultures.
        </p>
      </Section>
    </>
  );
}
