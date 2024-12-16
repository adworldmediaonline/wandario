'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { SectionWithTabs } from './ui/section-with-tabs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { ICategory } from '@/server/db/category';
import { useMemo } from 'react';
import { DestinationCard } from './destination-card';
import { EmptyState } from './ui/empty-state';
import { Compass } from 'lucide-react';

interface DestinationsSliderProps {
  categories: ICategory[];
  category: string;
}

export function DestinationsSlider({
  categories,
  category,
}: DestinationsSliderProps) {
  const destinations = useMemo(() => {
    if (!category) {
      return categories.flatMap((cat: ICategory) => cat.destinations || []);
    }
    return categories
      .filter(
        (cat: ICategory) => cat.name.toLowerCase() === category.toLowerCase()
      )
      .flatMap((cat: ICategory) => cat.destinations || []);
  }, [categories, category]);

  const hasDestinations = destinations.length > 0;

  return (
    <div className="space-y-8">
      <SectionWithTabs categories={categories} />

      {hasDestinations ? (
        <div className="relative px-2 sm:px-4">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                centeredSlides: false,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="destinations-swiper !pb-12"
          >
            {destinations.map(destination => (
              <SwiperSlide key={destination._id}>
                <DestinationCard destination={destination} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <EmptyState
          icon={Compass}
          title="No Destinations Found"
          description={
            category
              ? `No destinations found for ${category}. Try selecting a different category.`
              : 'No destinations available at the moment. Check back soon!'
          }
          className="px-4 sm:px-6"
        />
      )}
    </div>
  );
}
