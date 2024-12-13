'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Categories from './categories';
import { ICategory } from '@/server/db/category';

export function CategoriesTable({
  categories,
  offset,
  totalCategories,
}: {
  categories: ICategory[];
  offset: number;
  totalCategories: number;
}) {
  const router = useRouter();
  const categoriesPerPage = 5;

  function prevPage() {
    const newOffset = Math.max(0, offset - categoriesPerPage);
    router.push(`/dashboard/categories?offset=${newOffset}`, { scroll: false });
  }

  function nextPage() {
    const newOffset = offset + categoriesPerPage;
    router.push(`/dashboard/categories?offset=${newOffset}`, { scroll: false });
  }

  const startCount = totalCategories === 0 ? 0 : offset + 1;
  const endCount = Math.min(offset + categories.length, totalCategories);
  const hasNextPage = offset + categoriesPerPage < totalCategories;
  const hasPrevPage = offset > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Manage your categories</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>

              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map(category => (
              <Categories key={category._id} category={category} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            {totalCategories > 0 ? (
              <>
                Showing{' '}
                <strong>
                  {startCount}-{endCount}
                </strong>{' '}
                of <strong>{totalCategories}</strong> categories
              </>
            ) : (
              <span>No categories found</span>
            )}
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={!hasPrevPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={!hasNextPage}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
