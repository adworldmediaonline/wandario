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

import Blogs from './blogs';
import { IBlog } from '@/types';

export function BlogsTable({
  blogs,
  offset,
  totalBlogs,
}: {
  blogs: IBlog[];
  offset: number;
  totalBlogs: number;
}) {
  const router = useRouter();
  const blogsPerPage = 5;

  function prevPage() {
    const newOffset = Math.max(0, offset - blogsPerPage);
    router.push(`/dashboard/blogs?offset=${newOffset}`, {
      scroll: false,
    });
  }

  function nextPage() {
    const newOffset = offset + blogsPerPage;
    router.push(`/dashboard/blogs?offset=${newOffset}`, {
      scroll: false,
    });
  }

  const startCount = totalBlogs === 0 ? 0 : offset + 1;
  const endCount = Math.min(offset + blogs.length, totalBlogs);
  const hasNextPage = offset + blogsPerPage < totalBlogs;
  const hasPrevPage = offset > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blogs</CardTitle>
        <CardDescription>Manage your blogs</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>

              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map(blog => (
              <Blogs key={blog._id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            {totalBlogs > 0 ? (
              <>
                Showing{' '}
                <strong>
                  {startCount}-{endCount}
                </strong>{' '}
                of <strong>{totalBlogs}</strong> blogs
              </>
            ) : (
              <span>No blogs found</span>
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
