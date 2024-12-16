import { cn } from '@/lib/utils';
import CloudinaryImage from '@/components/cloudinary-image';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  imageId: string;
  className?: string;
  href?: string;
  description?: string;
  stats: {
    destinations: string;
    area: string;
  };
}

export function CategoryCard({
  name,
  imageId,
  className,
  href = '#',
  description,
  stats,
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          'group relative bg-white rounded-[32px] overflow-hidden isolate',
          'transition-all duration-500 ease-out',
          'shadow-[0_8px_20px_-8px_rgba(0,0,0,0.2)]',
          'hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]',
          'hover:translate-y-[-4px]',
          className
        )}
      >
        {/* Stats Badge */}
        <div className="absolute top-6 right-6 z-20">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Destinations</span>
              <span className="text-sm font-semibold text-gray-900">
                {stats.destinations}
              </span>
            </div>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full">
          <CloudinaryImage
            src={imageId}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="transition-transform duration-700 group-hover:scale-110"
            objectFit="cover"
            crop="fill"
            opacity={95}
          />
          {/* Multiple Gradient Overlays for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="space-y-3">
            <h3
              className={cn(
                'text-2xl font-bold text-white',
                'drop-shadow-md',
                'group-hover:scale-105 transition-transform duration-500'
              )}
            >
              {name}
            </h3>
            <p
              className={cn(
                'text-sm text-white/95 line-clamp-2',
                'drop-shadow-md',
                'leading-relaxed'
              )}
            >
              {description}
            </p>
            <div className="flex items-center justify-between pt-2">
              <button
                className={cn(
                  'flex items-center gap-2 text-white font-medium',
                  'px-4 py-2 rounded-full',
                  'bg-white/20 backdrop-blur-sm',
                  'transition-all duration-300',
                  'border border-white/10',
                  'shadow-sm',
                  'hover:bg-white/30 hover:border-white/20',
                  'active:scale-95'
                )}
              >
                Explore
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
