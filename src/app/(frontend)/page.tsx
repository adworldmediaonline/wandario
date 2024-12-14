import { Suspense } from 'react';
import Hero from '@/components/hero';
import CategoryShowcaseSkeleton from '@/components/skeletons/category-showcase-skeleton';
import { getCategories } from '@/server/db/category';
import CategoryShowcase from '@/components/category-showcase';

export default async function HomePage() {
  const { categories } = await getCategories('', 0, 8);

  return (
    <>
      <Hero />
      <Suspense fallback={<CategoryShowcaseSkeleton />}>
        <CategoryShowcase categories={categories} />
      </Suspense>
    </>
  );
}
