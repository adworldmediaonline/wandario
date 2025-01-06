'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import type { IBlog } from '@/types';
import { cn } from '@/lib/utils';
import CloudinaryImage from '@/components/cloudinary-image';

interface BlogCardProps {
  blog: IBlog;
  className?: string;
}

export default function BlogCard({ blog, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <CloudinaryImage
          src={blog.images[0].public_id}
          alt={blog.heading}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-4">
        <h3 className="line-clamp-2 text-xl font-semibold">{blog.heading}</h3>
        <p className="line-clamp-2 flex-1 text-muted-foreground">
          {blog.excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
