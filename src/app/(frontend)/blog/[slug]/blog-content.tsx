import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import CloudinaryImage from '@/components/cloudinary-image';
import type { IBlog } from '@/types';
import { Button } from '@/components/ui/button';
// import { useCallback } from 'react';
import { Prose } from '@/components/ui/prose';
import { FAQ } from '@/components/ui/faq';
import Link from 'next/link';
import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionSection,
} from '@/components/framer-motion-div/motion-div';

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
  // const handleShare = useCallback(async () => {
  //   try {
  //     if (navigator.share) {
  //       await navigator.share({
  //         title: blog.heading,
  //         text: blog.excerpt,
  //         url: window.location.href,
  //       });
  //     } else {
  //       await navigator.clipboard.writeText(window.location.href);
  //       // You might want to show a toast notification here
  //     }
  //   } catch (error) {
  //     console.error('Error sharing:', error);
  //   }
  // }, [blog.heading, blog.excerpt]);

  return (
    <article className="relative">
      {/* Back Button - Fixed Position */}
      <div className="fixed top-24 left-8 z-50 hidden lg:block">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 shadow-lg backdrop-blur-sm hover:bg-white hover:text-primary"
        >
          <Link href="/blog">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to blogs</span>
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative pb-10 pt-14 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
        </div>

        <div className="container">
          <MotionDiv
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-5xl mx-auto"
          >
            {/* Mobile Back Button */}
            <MotionDiv variants={item} className="mb-8 lg:hidden">
              <Button asChild variant="ghost" className="gap-2">
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4" />
                  Back to blogs
                </Link>
              </Button>
            </MotionDiv>

            {/* Category and Metadata */}
            <MotionDiv
              variants={item}
              className="flex flex-wrap items-center justify-center gap-4 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Tag className="h-4 w-4" />
                {blog.categoryId.name}
              </span>
              <time
                className="flex items-center text-sm text-gray-500"
                dateTime={blog.createdAt}
              >
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </MotionDiv>

            {/* Title */}
            <MotionH1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-8"
            >
              {blog.heading}
            </MotionH1>

            {/* Excerpt */}
            <MotionP
              variants={item}
              className="text-xl text-gray-600 text-center mb-12"
            >
              {blog.excerpt}
            </MotionP>

            {/* Share Button */}
            {/* <MotionDiv variants={item} className="flex justify-center mb-12">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                // onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Story
              </Button>
            </MotionDiv> */}

            {/* Featured Image */}
            <MotionDiv
              variants={item}
              className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl"
            >
              <CloudinaryImage
                src={blog.images[0].public_id}
                alt={blog.heading}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>

      {/* Content Section */}
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-5 pb-16 lg:pt-5 lg:pb-20"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Prose>
              <div dangerouslySetInnerHTML={{ __html: blog.description }} />
            </Prose>
          </div>
        </div>
      </MotionSection>

      {/* FAQs Section */}
      {blog.faqs && blog.faqs.length > 0 && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FAQ
            title="Common Questions About This Destination"
            description="Find answers to frequently asked questions about this travel destination."
            items={blog.faqs}
            className="bg-gray-50/50"
            variant="centered"
          />
        </MotionDiv>
      )}
    </article>
  );
}
