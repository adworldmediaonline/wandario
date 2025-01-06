'use client';

import { motion } from 'framer-motion';
import { Section } from './section';
import { Button } from './button';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag, PenLine } from 'lucide-react';
import CloudinaryImage from '../cloudinary-image';
import type { IBlog } from '@/types';
import { EmptyState } from './empty-state';
import { use } from 'react';

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

interface BlogShowcaseProps {
  promise: Promise<{ blogs: IBlog[]; totalBlogs: number }>;
  className?: string;
}

export default function BlogShowcase({
  promise,
  className,
}: BlogShowcaseProps) {
  const { blogs } = use(promise);
  const hasBlogs = blogs && blogs.length > 0;

  return (
    <Section className={className} container>
      <div className="relative py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div variants={item}>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Tag className="w-4 h-4 mr-2" />
                Latest Travel Stories
              </span>
            </motion.div>

            <motion.h2
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
            >
              Explore Travel Insights & Adventures
            </motion.h2>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-gray-600"
            >
              Discover inspiring stories, expert tips, and hidden gems from
              around the world
            </motion.p>
          </div>

          {/* Blog Grid or Empty State */}
          {hasBlogs ? (
            <motion.div
              variants={item}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogs.map(blog => (
                <motion.div
                  key={blog._id}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    scroll={true}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <CloudinaryImage
                        src={blog.thumbnail.public_id}
                        alt={blog.heading}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Category Badge and Date */}
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                          {blog.categoryId.name}
                        </span>
                        <time
                          className="flex items-center text-sm text-gray-500"
                          dateTime={blog.createdAt}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(blog.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </time>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.heading}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="pt-2">
                        <span className="inline-flex items-center text-primary font-medium group-hover:underline">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={item}>
              <EmptyState
                icon={PenLine}
                title="No Stories Yet"
                description="We're working on bringing you exciting travel stories. Check back soon for new adventures!"
                action={{
                  label: 'Explore Travel Guides',
                  href: '/guides',
                }}
              />
            </motion.div>
          )}

          {/* CTA */}
          {hasBlogs && (
            <motion.div variants={item} className="text-center">
              <Button asChild size="lg" className="rounded-full">
                <Link
                  href="/blogs"
                  className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <span>View All Stories</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
