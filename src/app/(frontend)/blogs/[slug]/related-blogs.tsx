'use client';

import { motion } from 'framer-motion';
import type { IBlog } from '@/types';
import BlogCard from '../blog-card';

interface RelatedBlogsProps {
  blogs: IBlog[];
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

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  return (
    <section className="py-16 lg:py-20 bg-gray-50/50">
      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl font-bold">Related Stories</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover more travel stories and insights
            </p>
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            variants={item}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map(blog => (
              <motion.div key={blog._id} variants={item}>
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
