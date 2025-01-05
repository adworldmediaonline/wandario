import { Suspense } from 'react';
import CategoryShowcaseSkeleton from '@/components/skeletons/category-showcase-skeleton';
import { getCategories } from '@/server/db/category';
import CategoryShowcase from '@/components/category-showcase';
import HeroHeader from '@/components/ui/hero-header';
import { EmptyState } from '@/components/ui/empty-state';
import { Compass } from 'lucide-react';
import ServiceShowcase from '@/components/ui/service-showcase';
import AboutUs from '@/components/ui/about-us';
import { FAQ } from '@/components/ui/faq';
import { homeFAQs } from '@/lib/app-data';
import TravelInsights from '@/components/ui/travel-insights';

export default async function HomePage() {
  const { categories } = await getCategories({ offset: '0', limit: '8' });

  return (
    <>
      <HeroHeader
        title="Plan Your Next Trip with Expert Travel, Cuisine, and Stays."
        excerpt="Get expert advice on destinations, local cuisines, accommodations, and more. Your go-to source for insightful travel information and tips."
        backgroundImageId="hero-banner_imkrwg"
        actions={{
          primary: {
            label: 'Explore Our Travel Guides',
            href: '#',
          },
          secondary: {
            label: 'Learn More',
            href: '#',
          },
        }}
      />
      <Suspense fallback={<CategoryShowcaseSkeleton />}>
        {categories.length > 0 ? (
          <CategoryShowcase categories={categories} />
        ) : (
          <EmptyState
            icon={Compass}
            title="No Categories Found"
            description="We're currently working on adding new travel categories. Check back soon for exciting destinations!"
            action={{
              label: 'Explore Our Travel Guides',
              href: '/guides',
            }}
          />
        )}
      </Suspense>

      <AboutUs />

      <TravelInsights variant="alternate" />

      <ServiceShowcase />

      <FAQ
        title="Common Travel Questions"
        description="Find answers to frequently asked questions about our travel guides and services."
        items={homeFAQs}
        className="bg-gray-50/50"
        variant="centered"
      />
    </>
  );
}
