import { SearchInput } from '@/components/search-input';
import Image from 'next/image';
import CloudinaryImage from './cloudinary-image';
import { SectionHeader } from './ui/section-header';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center py-5">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-gradient-to-l from-blue-50/90" />

      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
              <SectionHeader
                title="Explore the world one place at a time"
                description="Discover breathtaking destinations, create unforgettable memories, and explore the world's most beautiful places with us."
                highlight="Explore"
              />

              {/* Search Box */}
              <div className="bg-white rounded-xl shadow-[0_2px_40px_-12px_rgba(0,0,0,0.15)] p-3 sm:p-4 mt-6">
                <SearchInput />
              </div>
            </div>
          </div>

          {/* Right Images Grid - Hidden on Small Screens */}
          <div className="relative hidden md:block">
            <div className="aspect-[4/3] md:aspect-[16/12] lg:aspect-[4/3] w-full max-w-[600px] mx-auto">
              <div className="relative w-full h-full">
                {/* Main Image */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <CloudinaryImage
                    src="testing/hero-banner-1"
                    alt="Beautiful destination"
                    className="transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1280px) 50vw, 600px"
                    priority
                    fill
                  />
                </div>

                {/* Floating Images */}
                <div className="absolute -right-4 -top-4 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-xl">
                  <CloudinaryImage
                    src="testing/hero-banner-1"
                    alt="Travel moment"
                    className="transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1280px) 160px, 128px"
                    priority
                    fill
                  />
                </div>

                <div className="absolute -left-4 -bottom-4 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-xl">
                  <CloudinaryImage
                    src="testing/hero-banner-1"
                    alt="Scenic view"
                    className="transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1280px) 160px, 128px"
                    fill
                  />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-50 rounded-full -z-10 blur-3xl opacity-75" />
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-orange-50 rounded-full -z-10 blur-3xl opacity-75" />
          </div>

          {/* Mobile Single Image */}
          <div className="relative md:hidden">
            <div className="aspect-[3/4] sm:aspect-[4/3] w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/img-1.jpg"
                alt="Beautiful destination"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
