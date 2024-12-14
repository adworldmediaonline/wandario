'use client';

import { Section } from '@/components/ui/section';
import { SectionHeader } from '@/components/ui/section-header';
import { ICategory } from '@/server/db/category';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/ui/category-card';

export default function CategoryShowcase({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <Section className="bg-gradient-to-b from-white to-gray-50/50">
      <SectionHeader
        title="Journey Through Regions"
        description="Embark on a journey across the world's most fascinating regions. Whether you seek bustling cities, serene landscapes, or cultural treasures, find your perfect destination here."
        align="center"
        highlight="Regions"
      />

      {/* Regions Grid */}
      <div className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 xl:gap-3">
          {categories.map(category => (
            <CategoryCard
              key={category._id}
              name={category.name}
              imageId={category.thumbnail.public_id}
              destinationCount={category.destinations?.length}
              href={`/regions/${category._id}`}
            />
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 font-medium hover:bg-primary hover:text-white transition-all duration-300 border-2"
          >
            View All Regions
          </Button>
        </div>
      </div>
    </Section>
  );
}
