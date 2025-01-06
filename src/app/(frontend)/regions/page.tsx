import HeroHeader from '@/components/ui/hero-header';
import { getCategories } from '@/server/db/category';
import CategoryShowcase from '@/components/category-showcase';
import { Suspense } from 'react';
import CategoryShowcaseSkeleton from '@/components/skeletons/category-showcase-skeleton';
import { Section } from '@/components/ui/section';
import ErrorBoundaryContainer from '@/components/ui/error-boundary-container';
import DestinationsWrapper from '@/components/destinations-wrapper';
import { TripPlanningSection } from '@/components/ui/trip-planning-section';
import BlogShowcaseSkeleton from '@/components/skeletons/blog-showcase-skeleton';
import BlogShowcase from '@/components/ui/blog-showcase';
import { getBlogs } from '@/server/db/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wandario | Regions',
  description: '',
  keywords: '',
  alternates: {
    canonical: '/regions',
  },
};

export default async function RegionsPage(props: {
  searchParams: Promise<{ category: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category ?? '';
  const currentOffset = parseInt(searchParams.offset ?? '0', 10);

  // Create the promise for use with the use() hook
  const categoriesPromise = getCategories({
    offset: currentOffset.toString(),
  });

  const blogsPromise = getBlogs({ limit: '3' });

  return (
    <>
      <HeroHeader
        breadcrumb={{
          segments: [
            {
              title: 'Regions',
              href: '/regions',
            },
          ],
        }}
        title="Wandario—Your Guide to Seamless Adventures: Explore the World with Expert Travel Advice"
        excerpt="Plan, Prepare, and Perfect Your Travel Experience"
        backgroundImageId="regions_hd8bhh"
        actions={{
          primary: {
            label: 'Start Exploring',
            href: '#regions-grid',
          },
          secondary: {
            label: 'View Map',
            href: '#map',
          },
        }}
      />

      {/* Regions Grid Section */}
      <Section id="regions-grid" container>
        <ErrorBoundaryContainer>
          <Suspense fallback={<CategoryShowcaseSkeleton />}>
            <CategoryShowcase promise={categoriesPromise} />
          </Suspense>
        </ErrorBoundaryContainer>
      </Section>

      {/* Destinations Section */}
      <Section id="destinations" container>
        <ErrorBoundaryContainer>
          <Suspense fallback={<CategoryShowcaseSkeleton />}>
            <DestinationsWrapper
              promise={categoriesPromise}
              category={category}
            />
          </Suspense>
        </ErrorBoundaryContainer>
      </Section>
      <TripPlanningSection />
      <ErrorBoundaryContainer>
        <Suspense fallback={<BlogShowcaseSkeleton />}>
          <BlogShowcase promise={blogsPromise} className="bg-gray-50/50" />
        </Suspense>
      </ErrorBoundaryContainer>
    </>
  );
}
