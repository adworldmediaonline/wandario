import { notFound } from 'next/navigation';
import { getBlogById, getBlogs } from '@/server/db/blog';
import BlogContent from './blog-content';
import RelatedBlogs from './related-blogs';
import { Metadata } from 'next';

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
    title: `${blog.metaTitle} | Wandario`,
    description: blog.metaDescription,
    keywords: blog.metaKeywords,
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [
        {
          url: blog.thumbnail.secure_url,
          width: 1200,
          height: 630,
          alt: blog.heading,
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
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Blog Content */}
      <BlogContent blog={blog} />

      {/* Related Posts */}
      {relatedBlogs.length > 0 && <RelatedBlogs blogs={relatedBlogs} />}
    </main>
  );
}
