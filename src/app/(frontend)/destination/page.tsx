import HeroHeader from '@/components/ui/hero-header';
import { getCategories } from '@/server/db/category';
import { Suspense } from 'react';
import CategoryShowcaseSkeleton from '@/components/skeletons/category-showcase-skeleton';
import { Section } from '@/components/ui/section';
import ErrorBoundaryContainer from '@/components/ui/error-boundary-container';
import DestinationsWrapper from '@/components/destinations-wrapper';
import BlogShowcaseSkeleton from '@/components/skeletons/blog-showcase-skeleton';
import BlogShowcase from '@/components/ui/blog-showcase';
import { getBlogs } from '@/server/db/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Top Travel Destinations | Explore the Best Places to Visit with Wandario',
  description:
    'Discover handpicked travel destinations with Wandario. From pristine beaches to vibrant cities, explore curated guides, local insights, and travel tips for an authentic journey.',
  keywords:
    'Travel destinations, Popular places to visit, Global travel locations, Explore top destinations, Must-visit places worldwide, Travel tips for popular regions, Handpicked travel destinations with expert tips, Discover breathtaking landscapes and vibrant cities, Explore the world’s best destinations with Wandario',
  alternates: {
    canonical: '/destination',
  },
};

export default async function DestinationsPage(props: {
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
              title: 'Destination',
              href: '/destination',
            },
          ],
        }}
        title="Explore the World's Most Stunning Destinations"
        excerpt="Discover the best places to visit, from breathtaking landscapes to vibrant cities."
        backgroundImageId="pexels-bkd--30102800_w2gvad"
        actions={{
          primary: {
            label: 'Start Exploring',
            href: '#destinations',
          },
          // secondary: {
          //   label: 'View Map',
          //   href: '#map',
          // },
        }}
      />

      {/* Destinations Section */}
      <Section id="destinations" container>
        <ErrorBoundaryContainer>
          <Suspense fallback={<CategoryShowcaseSkeleton />}>
            <DestinationsWrapper
              promise={categoriesPromise}
              category={category}
              type="destination"
            />
          </Suspense>
        </ErrorBoundaryContainer>
      </Section>

      <ErrorBoundaryContainer>
        <Suspense fallback={<BlogShowcaseSkeleton />}>
          <BlogShowcase promise={blogsPromise} className="bg-gray-50/50" />
        </Suspense>
      </ErrorBoundaryContainer>
    </>
  );
}
