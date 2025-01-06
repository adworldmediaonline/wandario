'use client';

import { cn } from '@/lib/utils';
import CloudinaryImage from '@/components/cloudinary-image';
import { Breadcrumb } from './breadcrumb';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HeroHeaderV2Props {
  title: string;
  excerpt?: string;
  className?: string;
  backgroundImageId?: string;
  breadcrumb?: {
    segments: {
      title: string;
      href: string;
    }[];
  };
  navigationItems?: {
    id: string;
    label: string;
  }[];
}

export default function HeroHeaderV2({
  breadcrumb,
  title,
  excerpt,
  backgroundImageId,
  className,
  navigationItems,
}: HeroHeaderV2Props) {
  return (
    <header className={cn('relative flex flex-col', className)}>
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <CloudinaryImage
            src={backgroundImageId || 'default-hero_xvxmwp'}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col">
          <div className="container flex-1 flex flex-col justify-center py-12">
            {/* Breadcrumb */}
            {breadcrumb && (
              <div className="mb-8">
                <Breadcrumb
                  segments={breadcrumb.segments}
                  className="inline-flex bg-white/10 backdrop-blur-sm text-white/90 rounded-lg"
                />
              </div>
            )}

            {/* Title & Excerpt */}
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {title}
              </h1>
              {excerpt && (
                <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed">
                  {excerpt}
                </p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-b">
            <div className="container">
              <Tabs defaultValue="content" className="w-full">
                <div className="overflow-x-auto no-scrollbar">
                  <TabsList
                    className={cn(
                      'h-16 w-max min-w-full flex justify-start bg-transparent border-0 p-0',
                      'md:w-full md:justify-start'
                    )}
                  >
                    {navigationItems?.map(item => (
                      <TabsTrigger
                        key={item.id}
                        value={item.id}
                        className={cn(
                          'relative h-full px-6 rounded-none border-b-2 border-transparent',
                          'font-medium text-base whitespace-nowrap',
                          'hover:text-primary/90',
                          'data-[state=active]:border-primary data-[state=active]:text-primary',
                          'focus-visible:ring-0 focus-visible:ring-offset-0',
                          'transition-colors duration-200'
                        )}
                        onClick={() => {
                          const element = document.getElementById(item.id);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        {item.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
