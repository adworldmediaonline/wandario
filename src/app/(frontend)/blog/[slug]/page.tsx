import { notFound } from 'next/navigation';
import { getBlogById, getBlogs } from '@/server/db/blog';
import BlogContent from './blog-content';
import RelatedBlogs from './related-blogs';
import { Metadata } from 'next';
import { Section } from '@/components/ui/section';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const blog = await getBlogById(params.slug);

  if (!blog) {
    return {
      title: 'Blog Not Found | Wandario',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog?.metaTitle ?? ''} | Wandario`,
    description: blog?.metaDescription ?? '',
    keywords: blog?.metaKeywords ?? '',
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog?.metaTitle ?? '',
      description: blog?.metaDescription ?? '',
      images: [
        {
          url: blog?.thumbnail?.secure_url ?? '',
          width: 1200,
          height: 630,
          alt: blog?.heading ?? '',
        },
      ],
    },
  };
}

export default async function BlogPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  // Fetch blog and related posts in parallel
  const [blog, relatedBlogsData] = await Promise.all([
    getBlogById(params.slug),
    getBlogs({ limit: '3', category: params.slug }),
  ]);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = relatedBlogsData.blogs.filter(
    relatedBlog => relatedBlog._id !== blog._id
  );

  return (
    <Section className="py-6 lg:py-10" container>
      <div className="max-w-6xl mx-auto">
        <div className="relative flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <main className="flex-1 w-full max-w-3xl mx-auto lg:mx-0">
            <BlogContent blog={blog} />
          </main>

          {/* Sidebar */}
          {relatedBlogs.length > 0 && (
            <aside className="w-full lg:w-[220px] mt-10 lg:mt-0">
              <div className="lg:sticky lg:top-[88px]">
                <div className="pb-3 mb-4 border-b">
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Related Posts
                  </h2>
                </div>
                <RelatedBlogs blogs={relatedBlogs} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </Section>
  );
}
