'use client';

import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Navigation, MapPin, ArrowRight, Compass } from 'lucide-react';
import { use } from 'react';
import type { IDestination } from '@/types';
import CloudinaryImage from './cloudinary-image';
import { EmptyState } from './ui/empty-state';
import { useRouter } from 'next/navigation';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function RegionDestinationsShowcase({
  promise,
}: {
  promise: Promise<{ destinations: IDestination[]; totalDestinations: number }>;
}) {
  const { destinations, totalDestinations } = use(promise);
  const hasDestinations = destinations && destinations.length > 0;
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
    window.scrollTo(0, 0);
  };

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
            Popular Destinations
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        >
          Must-Visit Places
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
        >
          Explore the most captivating destinations in this region, each
          offering unique experiences and unforgettable memories.
        </motion.p>
      </div>

      {hasDestinations ? (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          >
            {destinations.map(destination => (
              <motion.div
                key={destination._id}
                variants={item}
                className="group relative cursor-pointer"
                onClick={() =>
                  handleNavigation(`/destination/${destination.slug}`)
                }
              >
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100">
                  {/* Background Image */}
                  <CloudinaryImage
                    src={destination.thumbnail.public_id}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80 opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <div className="transform transition-all duration-500 ease-out group-hover:translate-y-0">
                      {/* Destination Name */}
                      <div className="overflow-hidden mb-4">
                        <div className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/90 text-gray-900 shadow-lg backdrop-blur-sm">
                          <MapPin className="w-4 h-4 inline-block mr-2 text-primary" />
                          {destination.name}
                        </div>
                      </div>

                      <div className="overflow-hidden">
                        <div
                          className="text-white mb-4 prose prose-invert prose-sm max-w-none line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              destination.excerpt ||
                              'Discover the unique charm and attractions of this destination.',
                          }}
                        />
                      </div>

                      <div className="overflow-hidden">
                        <div className="flex items-center text-white/90 hover:text-white group/btn">
                          <span className="text-sm font-medium mr-2 border-b border-white/0 group-hover/btn:border-white/90 transition-colors duration-300">
                            Explore Destination
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none mix-blend-overlay bg-primary" />
                </div>

                {/* Card Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-orange-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {totalDestinations > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-16"
            >
              <button
                onClick={() => handleNavigation('/destination')}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300"
              >
                <span className="font-medium">View All Destinations</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </>
      ) : (
        <EmptyState
          icon={Compass}
          title="No Destinations Found"
          description="We're currently working on adding new destinations to this region. Check back soon for exciting places to explore!"
          action={{
            label: 'Explore Other Regions',
            href: '/region',
          }}
        />
      )}
    </Section>
  );
}
