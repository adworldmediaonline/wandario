'use client';

import { use } from 'react';
import { ICategory } from '@/server/db/category';
import { EmptyState } from '@/components/ui/empty-state';
import { Globe2 } from 'lucide-react';
import { DestinationsSlider } from '@/components/destinations-slider';

interface DestinationsWrapperProps {
  promise: Promise<{ categories: ICategory[]; totalCategories: number }>;
  category: string;
  type?: 'regions' | 'destinations';
}

export default function DestinationsWrapper({
  promise,
  category,
  type,
}: DestinationsWrapperProps) {
  const { categories } = use(promise);
  const hasDestinations = categories.some(cat => cat.destinations?.length > 0);

  if (!hasDestinations) {
    return (
      <EmptyState
        icon={Globe2}
        title="No Destinations Yet"
        description="We're working on adding exciting destinations. Stay tuned for updates!"
        className="min-h-[300px]"
      />
    );
  }

  return (
    <DestinationsSlider
      type={type}
      categories={categories}
      category={category}
    />
  );
}
