import { Suspense } from 'react';
import { getBlogs } from '@/server/db/blog';
import { getBlogCategories } from '@/server/db/blog-category';
import BlogList from './blog-list';
import BlogListSkeleton from './blog-list-skeleton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Stories & Insights | Wandario',
  description:
    'Discover inspiring travel stories, expert tips, and hidden gems from around the world. Your source for authentic travel experiences and insights.',
};

export default async function BlogPage(props: {
  searchParams: Promise<{ page: string; category: string; search: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 9; // Items per page
  const offset = (page - 1) * limit;

  // Parallel fetch blogs and categories
  const [blogsData, categoriesData] = await Promise.all([
    getBlogs({
      offset: offset.toString(),
      limit: limit.toString(),
      category: searchParams.category,
      search: searchParams.search,
    }),
    getBlogCategories({}),
  ]);

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gray-50/50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
        </div>

        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Travel Stories & Insights
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600">
              Discover inspiring stories, expert tips, and hidden gems from
              around the world. Your source for authentic travel experiences and
              insights.
            </p>
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList
          blogs={blogsData.blogs}
          categories={categoriesData.categories}
          totalBlogs={blogsData.totalBlogs}
          currentPage={page}
          itemsPerPage={limit}
          searchParams={searchParams}
        />
      </Suspense>
    </main>
  );
}
