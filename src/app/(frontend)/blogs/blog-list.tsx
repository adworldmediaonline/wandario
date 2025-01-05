'use client';

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import type { IBlog, IBlogCategory } from '@/types';

import { EmptyState } from '@/components/ui/empty-state';
import BlogCard from './blog-card';
import Pagination from '@/components/ui/pagination';

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
      delayChildren: 0.1,
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
        router.push(`/blogs?${params.toString()}`);
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
        router.push(`/blogs?${params.toString()}`);
      });
    },
    [queryParams, router]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(queryParams.toString());
      params.set('page', page.toString());
      startTransition(() => {
        router.push(`/blogs?${params.toString()}`);
      });
    },
    [queryParams, router]
  );

  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search stories..."
              className="pl-10"
              defaultValue={searchParams.search}
              onChange={e => handleSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
          <Select
            defaultValue={searchParams.category || 'all'}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select category" />
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

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map(blog => (
              <motion.div key={blog._id} variants={item}>
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            title="No Stories Found"
            description={
              searchParams.search
                ? `No stories found for "${searchParams.search}". Try different keywords or browse all stories.`
                : 'No stories found in this category. Check back soon for new content!'
            }
            action={{
              label: 'View All Stories',
              href: '/blogs',
            }}
          />
        )}

        {/* Pagination */}
        {blogs.length > 0 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalItems={totalBlogs}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
