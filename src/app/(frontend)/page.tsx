import { Suspense } from 'react';
import CategoryShowcaseSkeleton from '@/components/skeletons/category-showcase-skeleton';
import { getCategories } from '@/server/db/category';
import CategoryShowcase from '@/components/category-showcase';
import HeroHeader from '@/components/ui/hero-header';
import ServiceShowcase from '@/components/ui/service-showcase';
import AboutUs from '@/components/ui/about-us';
import { FAQ } from '@/components/ui/faq';
import { homeFAQs } from '@/lib/app-data';
import TravelInsights from '@/components/ui/travel-insights';
import BlogShowcase from '@/components/ui/blog-showcase';
import BlogShowcaseSkeleton from '@/components/skeletons/blog-showcase-skeleton';
import { getBlogs } from '@/server/db/blog';
import ErrorBoundaryContainer from '@/components/ui/error-boundary-container';

export default function HomePage() {
  // Create promises on the server
  const categoriesPromise = getCategories({ offset: '0', limit: '8' });
  const blogsPromise = getBlogs({ limit: '3' });

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

      <ErrorBoundaryContainer>
        <Suspense fallback={<CategoryShowcaseSkeleton />}>
          <CategoryShowcase promise={categoriesPromise} />
        </Suspense>
      </ErrorBoundaryContainer>

      <AboutUs />

      <TravelInsights variant="alternate" />

      <ServiceShowcase />

      <ErrorBoundaryContainer>
        <Suspense fallback={<BlogShowcaseSkeleton />}>
          <BlogShowcase promise={blogsPromise} className="bg-gray-50/50" />
        </Suspense>
      </ErrorBoundaryContainer>

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
