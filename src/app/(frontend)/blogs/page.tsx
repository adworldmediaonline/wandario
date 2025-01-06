import { Suspense } from 'react';
import { getBlogs } from '@/server/db/blog';
import { getBlogCategories } from '@/server/db/blog-category';
import BlogList from './blog-list';
import BlogListSkeleton from './blog-list-skeleton';
import { Metadata } from 'next';
import HeroHeader from '@/components/ui/hero-header';

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
      <HeroHeader
        title="Travel Stories & Adventures"
        excerpt="Embark on a journey through our curated collection of travel tales, expert insights, and hidden gems from around the world. Let our stories inspire your next adventure."
        backgroundImageId="pexels-trksami-30043603_ks6pbz"
        breadcrumb={{
          segments: [
            { title: 'Home', href: '/' },
            { title: 'Blogs', href: '/blogs' },
          ],
        }}
        actions={{
          primary: {
            label: 'Start Reading',
            href: '#stories',
          },
          secondary: {
            label: 'Share Your Story',
            href: '/contact',
          },
        }}
      />

      {/* Blog List Section */}
      <div id="stories">
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
      </div>
    </main>
  );
}
