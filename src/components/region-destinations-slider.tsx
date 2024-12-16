'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { IDestination } from '@/types';
import { DestinationCard } from './destination-card';

interface RegionDestinationsSliderProps {
  destinations: IDestination[];
  title?: string;
}

export function RegionDestinationsSlider({
  destinations,
  title = 'Popular Destinations',
}: RegionDestinationsSliderProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
            Discover the most fascinating places and experiences in this region
          </p>
        </div>
      </div>

      <div className="relative px-2 sm:px-4">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          initialSlide={0}
          centeredSlides={false}
          watchSlidesProgress={true}
          preventInteractionOnTransition={true}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.5,
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
          className="destinations-swiper !overflow-hidden"
        >
          {destinations.map(destination => (
            <SwiperSlide
              key={destination._id}
              className="swiper-slide-transform"
            >
              <DestinationCard destination={destination} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
