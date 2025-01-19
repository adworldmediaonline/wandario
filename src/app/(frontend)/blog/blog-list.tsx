'use client';

import { Input } from '@/components/ui/input';
import { Search, Clock, Eye } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import type { IBlog, IBlogCategory } from '@/types';
import { EmptyState } from '@/components/ui/empty-state';
import Pagination from '@/components/ui/pagination';
import { MotionDiv } from '@/components/framer-motion-div/motion-div';
import { Section } from '@/components/ui/section';

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
        router.push(`/blog?${params.toString()}`, { scroll: false });
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
        router.push(`/blog?${params.toString()}`, { scroll: false });
      });
    },
    [queryParams, router]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(queryParams.toString());
      params.set('page', page.toString());
      startTransition(() => {
        router.push(`/blog?${params.toString()}`, { scroll: false });
      });
    },
    [queryParams, router]
  );

  return (
    <Section className="py-16 lg:py-20">
      <div className="container">
        {/* Filters */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <div className="flex flex-col gap-8">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  !searchParams.category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Stories
              </button>
              {categories.map(category => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category._id)}
                  className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    searchParams.category === category._id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto w-full">
              <Input
                type="search"
                placeholder="Search stories..."
                className="pl-12 h-12 rounded-full border-gray-200 focus:border-primary focus:ring-primary bg-gray-50/50"
                defaultValue={searchParams.search}
                onChange={e => handleSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
          <>
            <MotionDiv
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {blogs.map(blog => (
                <MotionDiv
                  key={blog._id}
                  variants={item}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent z-10" />
                    <img
                      src={`https://res.cloudinary.com/${
                        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                      }/image/upload/c_fill,w_800,h_500/${
                        blog.images[0].public_id
                      }`}
                      alt={blog.heading}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Category Badge */}
                    <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-900 backdrop-blur-sm">
                      {blog.categoryId.name}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.heading}
                    </h3>
                    <p className="mb-4 text-gray-600 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="mt-auto flex items-center gap-4 text-sm text-gray-500">
                      <time
                        className="flex items-center gap-1.5"
                        dateTime={blog.createdAt}
                      >
                        <Clock className="h-4 w-4" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                      <span className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        {Math.ceil(blog.description.length / 1000)} min read
                      </span>
                    </div>
                  </div>

                  <a
                    href={`/blog/${blog.slug}`}
                    className="absolute inset-0"
                    aria-label={`Read more about ${blog.heading}`}
                  />
                </MotionDiv>
              ))}
            </MotionDiv>

            {/* Pagination */}
            {totalBlogs > itemsPerPage && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalBlogs}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
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
      </div>
    </Section>
  );
}
