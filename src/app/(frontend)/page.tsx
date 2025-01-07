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
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Destinations, Travel Guides, and Expert Tips | Wandario',
  description:
    'Discover expert travel guides, accommodations, local cuisines, and adventure tips with Wandario. Plan your next unforgettable trip with insights and resources curated just for you.',
  keywords:
    'Travel planning, Expert travel guides, Best travel destinations, Travel inspiration, Wanderlust journeys, Personalized travel experiences, Plan your next adventure with expert tips, Discover hidden gems for your travels, Comprehensive travel planning resources',

  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Explore Destinations, Travel Guides, and Expert Tips | Wandario',
    description:
      'Discover expert travel guides, accommodations, local cuisines, and adventure tips with Wandario. Plan your next unforgettable trip with insights and resources curated just for you.',
    images: [
      {
        url: 'https://res.cloudinary.com/datdyxl7o/image/upload/o_100/c_fill,w_640,g_auto/f_webp/q_90/v1/hero-banner_imkrwg?_a=BAVAZGBz0',
        width: 1200,
        height: 630,
        alt: 'Wandario',
      },
    ],
  },
};

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
