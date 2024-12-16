'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import { DestinationCard } from './destination-card';
import { SectionWithTabs } from './ui/section-with-tabs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ICategory } from '@/server/db/category';

export function DestinationsSlider({
  categories,
  category,
}: {
  categories: ICategory[];
  category: string;
}) {
  const filteredCategories = categories.filter(cat => cat.name === category);
  console.log(filteredCategories);
  return (
    <div className="space-y-8">
      <SectionWithTabs categories={categories} />

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="destinations-swiper"
      >
        {filteredCategories.map(category => (
          <SwiperSlide key={category._id}>
            {/* <DestinationCard
              name={category.name}
              imageId={category.imageId}
              href={`/regions?category=${category.name}`}
            /> */}
            <div>asds</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
