import { Suspense } from 'react';
import CategoryShowcaseSkeleton from '@/components/skeletons/category-showcase-skeleton';
import { getCategories } from '@/server/db/category';
import CategoryShowcase from '@/components/category-showcase';
import HeroHeader from '@/components/ui/hero-header';
import { EmptyState } from '@/components/ui/empty-state';
import { Compass } from 'lucide-react';

export default async function HomePage() {
  const { categories } = await getCategories({ offset: '0', limit: '8' });

  return (
    <>
      <HeroHeader
        breadcrumb={{
          segments: [
            {
              title: 'Regions',
              href: '/regions',
            },
            {
              title: 'North America',
              href: '/regions/north-america',
            },
          ],
        }}
        title="Explore the world one place at a time"
        excerpt="Every Tour Is Your Calling! Discover Hidden Beauty, Savor Epic Sunsets, & Etch Lifelong Memories. Trust the Expertise of Our Best Travel Guide Reviews, Endorsed by the Experienced."
        backgroundImageId="testing/hero-banner"
        actions={{
          primary: {
            label: 'Contact Us',
            href: '/contact',
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
              label: 'Contact Us',
              href: '/contact',
            }}
          />
        )}
      </Suspense>
    </>
  );
}
