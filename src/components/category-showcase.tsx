'use client';

import { SectionHeader } from '@/components/ui/section-header';
import { ICategory } from '@/server/db/category';
import { CategoryCard } from '@/components/ui/category-card';

const STATS = [
  { destinations: '500+', area: '44.5M km²' },
  { destinations: '400+', area: '10.2M km²' },
  { destinations: '600+', area: '30.4M km²' },
  { destinations: '300+', area: '8.5M km²' },
] as const;

const DESCRIPTIONS = [
  'Discover diverse landscapes and rich cultural heritage in this vibrant region.',
  'Explore ancient traditions and breathtaking natural wonders of this unique territory.',
  'Experience the charm of historic cities and stunning countryside vistas.',
  'Immerse yourself in the authentic culture and natural beauty of this region.',
];

export default function CategoryShowcase({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50/50">
      <SectionHeader
        title="Explore World Regions"
        excerpt="Embark on a journey through diverse regions across the globe. From bustling cities to serene landscapes, each region offers its own unique cultural heritage and natural wonders."
        align="center"
        highlight="Regions"
        divider={true}
        titleClassName="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
        descriptionClassName="max-w-3xl"
      />

      <div className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category._id}
              name={category.name}
              imageId={category.thumbnail.public_id}
              href={`/regions/${category.slug}`}
              description={DESCRIPTIONS[index % DESCRIPTIONS.length]}
              stats={STATS[index % STATS.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
