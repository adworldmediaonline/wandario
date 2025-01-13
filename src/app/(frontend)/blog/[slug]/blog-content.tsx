import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import CloudinaryImage from '@/components/cloudinary-image';
import type { IBlog } from '@/types';
import { Button } from '@/components/ui/button';
import { Prose } from '@/components/ui/prose';
import { FAQ } from '@/components/ui/faq';
import Link from 'next/link';
import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionSection,
} from '@/components/framer-motion-div/motion-div';
import ShareStory from '@/components/share/share';

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
      <div className="relative pb-8 pt-0">
        <MotionDiv
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Mobile Back Button */}
          <MotionDiv variants={item} className="mb-4 lg:hidden">
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
            className="flex flex-wrap justify-center items-center gap-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Tag className="h-4 w-4" />
              {blog.categoryId.name}
            </span>
            <time
              className="flex items-center text-sm text-muted-foreground"
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
            className="text-2xl text-center sm:text-3xl lg:text-4xl font-bold text-gray-900"
          >
            {blog.heading}
          </MotionH1>

          {/* Excerpt */}
          <MotionP
            variants={item}
            className="text-base text-center sm:text-lg text-muted-foreground"
          >
            {blog.excerpt}
          </MotionP>

          {/* Share Button */}
          <ShareStory blog={blog} />

          {/* Featured Image */}
          <MotionDiv
            variants={item}
            className="relative aspect-[1280/853] rounded-xl overflow-hidden"
          >
            <CloudinaryImage
              src={blog.images[0].public_id}
              alt={blog.heading}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              crop="fill"
              priority
            />
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* Content Section */}
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-1"
      >
        <Prose>
          <div dangerouslySetInnerHTML={{ __html: blog.description }} />
        </Prose>
      </MotionSection>

      {/* FAQs Section */}
      {blog.faqs && blog.faqs.length > 0 && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
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
