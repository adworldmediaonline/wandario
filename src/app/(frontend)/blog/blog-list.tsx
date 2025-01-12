'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import type { IBlog, IBlogCategory } from '@/types';
import { EmptyState } from '@/components/ui/empty-state';
import BlogCard from './blog-card';
import Pagination from '@/components/ui/pagination';
import { MotionDiv } from '@/components/framer-motion-div/motion-div';

interface BlogListProps {
  blogs: IBlog[];
  categories: IBlogCategory[];
  totalBlogs: number;
  currentPage: number;
  itemsPerPage: number;
  searchParams: {
    category?: string;
    search?: string;
  };
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function BlogList({
  blogs,
  categories,
  totalBlogs,
  currentPage,
  itemsPerPage,
  searchParams,
}: BlogListProps) {
  const router = useRouter();
  const queryParams = useSearchParams();
  const [, startTransition] = useTransition();

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(queryParams.toString());
      if (term) {
        params.set('search', term);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); // Reset to first page on new search
      startTransition(() => {
        router.push(`/blog?${params.toString()}`);
      });
    },
    [queryParams, router]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      const params = new URLSearchParams(queryParams.toString());
      if (category !== 'all') {
        params.set('category', category);
      } else {
        params.delete('category');
      }
      params.set('page', '1'); // Reset to first page on category change
      startTransition(() => {
        router.push(`/blog?${params.toString()}`);
      });
    },
    [queryParams, router]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(queryParams.toString());
      params.set('page', page.toString());
      startTransition(() => {
        router.push(`/blog?${params.toString()}`);
      });
    },
    [queryParams, router]
  );

  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        {/* Filters */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search stories..."
                  className="pl-10 h-12 rounded-full border-gray-200 focus:border-primary focus:ring-primary"
                  defaultValue={searchParams.search}
                  onChange={e => handleSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <div className="relative">
                <Select
                  defaultValue={searchParams.category || 'all'}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full sm:w-[200px] h-12 rounded-full border-gray-200 [&>span]:flex [&>span]:items-center [&>span]:gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Results Summary */}
        {blogs.length > 0 && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
              {Math.min(currentPage * itemsPerPage, totalBlogs)} of {totalBlogs}{' '}
              stories
            </p>
          </MotionDiv>
        )}

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <MotionDiv
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map(blog => (
              <MotionDiv key={blog._id} variants={item}>
                <BlogCard blog={blog} />
              </MotionDiv>
            ))}
          </MotionDiv>
        ) : (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <EmptyState
              title="No Stories Found"
              description={
                searchParams.search
                  ? `No stories found for "${searchParams.search}". Try different keywords or browse all stories.`
                  : 'No stories found in this category. Check back soon for new content!'
              }
              action={{
                label: 'View All Stories',
                href: '/blog',
              }}
            />
          </MotionDiv>
        )}

        {/* Pagination */}
        {blogs.length > 0 && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <Pagination
              currentPage={currentPage}
              totalItems={totalBlogs}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </MotionDiv>
        )}
      </div>
    </section>
  );
}
