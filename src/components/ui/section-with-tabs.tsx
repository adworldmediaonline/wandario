'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { SectionHeader } from './section-header';
import { ICategory } from '@/server/db/category';

export function SectionWithTabs({
  className,
  categories,
}: {
  className?: string;
  categories: ICategory[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function searchAction(formData: FormData) {
    const category = formData.get('category') as string;
    const params = new URLSearchParams({ category: category || 'asia' });
    startTransition(() => {
      router.replace(`/regions?${params.toString()}`, {
        scroll: false,
      });
    });
  }

  return (
    <>
      <SectionHeader
        title="Popular Destinations"
        description="Explore our handpicked selection of stunning destinations"
      />
      <form
        action={searchAction}
        className={cn(
          'relative flex items-center gap-2 flex-wrap justify-center',
          className
        )}
      >
        {categories.map(category => (
          <Button
            key={category._id}
            name="category"
            value={category.name}
            type="submit"
            size="icon"
            className="rounded-xl bg-primary hover:bg-primary/90 transition-colors w-auto px-4 py-2"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-white" />
            ) : (
              category.name
            )}
          </Button>
        ))}
      </form>
    </>
  );
}
