'use client';

import { IBlog } from '@/types';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import CloudinaryImage from '@/components/cloudinary-image';

interface RelatedBlogsProps {
  blogs: IBlog[];
}

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  return (
    <div className="space-y-4">
      {blogs.map(blog => (
        <Link
          key={blog._id}
          href={`/blog/${blog.slug}`}
          className="group block"
        >
          <article className="flex gap-3 items-start">
            {/* Thumbnail */}
            <div className="relative w-20 aspect-[4/3] shrink-0 overflow-hidden rounded-md">
              <CloudinaryImage
                src={blog.thumbnail.public_id}
                alt={blog.heading}
                fill
                sizes="80px"
              />
            </div>

            {/* Content */}
            <div className="min-w-0">
              <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {blog.heading}
              </h3>
              <time className="mt-1 block text-xs text-muted-foreground">
                {formatDate(blog.createdAt)}
              </time>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
