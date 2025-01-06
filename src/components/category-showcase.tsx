'use client';

import { motion } from 'framer-motion';
import { ICategory } from '@/server/db/category';
import { Section } from './ui/section';
import CloudinaryImage from './cloudinary-image';
import Link from 'next/link';
import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import { use } from 'react';
import { EmptyState } from './ui/empty-state';
import { Compass } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Function to generate a unique background gradient for each region
const getRegionStyle = (name: string) => {
  // Generate a unique hue based on the region name
  const hue =
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;

  return {
    background: `linear-gradient(135deg,
      hsla(${hue}, 80%, 60%, 0.1) 0%,
      hsla(${hue + 30}, 70%, 50%, 0.15) 100%)`,
  };
};

export default function CategoryShowcase({
  promise,
}: {
  promise: Promise<{ categories: ICategory[]; totalCategories: number }>;
}) {
  const { categories, totalCategories } = use(promise);
  const hasCategories = categories && categories.length > 0;

  return (
    <Section className="relative overflow-hidden" container>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-block mb-3"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Navigation className="w-4 h-4 mr-2" />
            Explore Destinations
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        >
          Discover Your Next Adventure
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html:
              'Embark on a journey through diverse landscapes and cultures. Each region offers unique experiences waiting to be discovered.',
          }}
        />
      </div>

      {hasCategories ? (
        <>
          {/* Categories Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          >
            {categories.map(category => (
              <motion.div
                key={category._id}
                variants={item}
                className="group relative"
              >
                <Link href={`/regions/${category.slug}`} scroll={true}>
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100">
                    {/* Background Image */}
                    <CloudinaryImage
                      src={category.thumbnail.public_id}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80 opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                      <div className="transform transition-all duration-500 ease-out group-hover:translate-y-0">
                        {/* Region Name with Unique Style */}
                        <div className="overflow-hidden mb-4">
                          <div
                            className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/90 text-gray-900 shadow-lg backdrop-blur-sm"
                            style={getRegionStyle(category.name)}
                          >
                            <MapPin className="w-4 h-4 inline-block mr-2 text-primary" />
                            {category.name}
                          </div>
                        </div>

                        <div className="overflow-hidden">
                          <div
                            className="text-white mb-4 prose prose-invert prose-sm max-w-none line-clamp-3"
                            dangerouslySetInnerHTML={{
                              __html:
                                category.excerpt ||
                                'Explore the wonders and unique experiences of this amazing region.',
                            }}
                          />
                        </div>

                        <div className="overflow-hidden">
                          <div className="flex items-center text-white/90 hover:text-white group/btn">
                            <span className="text-sm font-medium mr-2 border-b border-white/0 group-hover/btn:border-white/90 transition-colors duration-300">
                              Explore Region
                            </span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                      style={getRegionStyle(category.name)}
                    />
                  </div>
                </Link>

                {/* Card Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-orange-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {/* View All Link */}
          {totalCategories > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-16"
            >
              <Link
                href="/regions"
                scroll={true}
                prefetch={true}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300"
              >
                <span className="font-medium">View All Regions</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </>
      ) : (
        <EmptyState
          icon={Compass}
          title="No Categories Found"
          description="We're currently working on adding new travel categories. Check back soon for exciting destinations!"
          action={{
            label: 'Explore Our Travel Guides',
            href: '/guides',
          }}
        />
      )}
    </Section>
  );
}
