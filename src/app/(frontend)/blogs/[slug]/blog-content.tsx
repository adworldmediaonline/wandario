'use client';

import { motion } from 'framer-motion';
import { Calendar, Share2 } from 'lucide-react';
import CloudinaryImage from '@/components/cloudinary-image';
import type { IBlog } from '@/types';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

interface BlogContentProps {
  blog: IBlog;
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

export default function BlogContent({ blog }: BlogContentProps) {
  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.heading,
          text: blog.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [blog.heading, blog.excerpt]);

  return (
    <article>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gray-50/50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
        </div>

        <div className="container">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto"
          >
            {/* Category and Date */}
            <motion.div
              variants={item}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                {blog.categoryId.name}
              </span>
              <time
                className="flex items-center text-sm text-gray-500"
                dateTime={blog.createdAt}
              >
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-8"
            >
              {blog.heading}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              variants={item}
              className="text-xl text-gray-600 text-center mb-12"
            >
              {blog.excerpt}
            </motion.p>

            {/* Share Button */}
            <motion.div variants={item} className="flex justify-center mb-12">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Story
              </Button>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              variants={item}
              className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl"
            >
              <CloudinaryImage
                src={blog.thumbnail.public_id}
                alt={blog.heading}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            <div dangerouslySetInnerHTML={{ __html: blog.description }} />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {blog.faqs && blog.faqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-8">
                {blog.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
