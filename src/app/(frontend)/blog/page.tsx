import { Suspense } from 'react';
import { getBlogs } from '@/server/db/blog';
import { getBlogCategories } from '@/server/db/blog-category';
import BlogList from './blog-list';
import BlogListSkeleton from './blog-list-skeleton';
import { Metadata } from 'next';
import HeroHeader from '@/components/ui/hero-header';
import { Section } from '@/components/ui/section';
import { MotionDiv } from '@/components/framer-motion-div/motion-div';
import CloudinaryImage from '@/components/cloudinary-image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inspiring Travel Stories, Tips, and Adventures | Wandario',
  description:
    'Explore captivating travel tales, solo travel guides, and expert advice. Uncover hidden gems, cultural experiences, and tips for unforgettable adventures worldwide.',
  keywords:
    'Travel stories, Expert travel insights, Hidden travel gems, Inspiring travel experiences, Solo travel tips, Travel adventures worldwide, Curated travel stories to inspire your journeys, Expert travel tips for unique adventures, Hidden gems from around the world',
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage(props: {
  searchParams: Promise<{ page: string; category: string; search: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 9; // Items per page
  const offset = (page - 1) * limit;

  // Parallel fetch blogs and categories
  const [blogsData, categoriesData, featuredBlogsData] = await Promise.all([
    getBlogs({
      offset: offset.toString(),
      limit: limit.toString(),
      category: searchParams.category,
      search: searchParams.search,
    }),
    getBlogCategories({}),
    getBlogs({
      limit: '1',
      featured: 'true',
    }),
  ]);

  const featuredBlog = featuredBlogsData.blogs[0];

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <HeroHeader
        title="Travel Stories & Adventures"
        excerpt="Embark on a journey through our curated collection of travel tales, expert insights, and hidden gems from around the world. Let our stories inspire your next adventure."
        backgroundImageId="pexels-trksami-30043603_ks6pbz"
        breadcrumb={{
          segments: [
            { title: 'Home', href: '/' },
            { title: 'Blog', href: '/blog' },
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

      {/* Featured Blog Section */}
      {featuredBlog && (
        <Section className="py-16 lg:py-20">
          <div className="container">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-gray-900"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <CloudinaryImage
                  src={featuredBlog.images[0].public_id}
                  alt={featuredBlog.heading}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60" />
              </div>

              {/* Content */}
              <div className="relative grid gap-4 px-6 py-12 sm:px-8 md:py-16 lg:grid-cols-2 lg:gap-12 lg:px-12">
                <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                        Featured Story
                      </span>
                      <time className="flex items-center text-sm text-gray-300">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(featuredBlog.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </time>
                    </div>
                    <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                      {featuredBlog.heading}
                    </h2>
                    <p className="text-lg text-gray-300 line-clamp-3">
                      {featuredBlog.excerpt}
                    </p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="w-fit gap-2 rounded-full"
                  >
                    <Link href={`/blog/${featuredBlog.slug}`}>
                      Read Story
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-auto">
                  <CloudinaryImage
                    src={featuredBlog.images[0].public_id}
                    alt={featuredBlog.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </MotionDiv>
          </div>
        </Section>
      )}

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
