import { cn } from '@/lib/utils';
import CloudinaryImage from '@/components/cloudinary-image';
import { MapPin, ArrowRight, Navigation2 } from 'lucide-react';
import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  imageId: string;
  destinationCount?: number;
  className?: string;
  href?: string;
}

export function CategoryCard({
  name,
  imageId,
  destinationCount,
  className,
  href = '#',
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          'group relative bg-white rounded-3xl overflow-hidden isolate',
          'transition-all duration-500 ease-out',
          'shadow-[0_8px_20px_-12px_rgba(0,0,0,0.2)]',
          'hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)]',
          'border border-gray-100/50',
          // Gradient border effect - Always visible
          'before:absolute before:inset-0 before:-z-10 before:p-1 before:rounded-3xl before:bg-gradient-to-r',
          'before:from-primary/0 before:via-primary/10 before:to-primary/0',
          'before:opacity-100',
          // Background glow effect - Always visible
          'after:absolute after:inset-0 after:-z-20 after:rounded-3xl',
          'after:bg-gradient-to-r after:from-primary/0 after:via-primary/5 after:to-primary/0',
          'after:blur-xl after:opacity-100',
          className
        )}
      >
        {/* Image Container */}
        <div className="relative flex justify-center items-center p-4">
          {/* Destination Count Badge - Default visible state */}
          <div className="absolute top-2 right-2 z-10">
            <div
              className={cn(
                'flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full',
                'shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15)]',
                'transition-all duration-500',
                'border border-primary/10',
                'bg-gradient-to-r from-white/95 to-primary/5'
              )}
            >
              <Navigation2 className="w-3.5 h-3.5 text-primary/80 transition-transform duration-500" />
              <span className="text-xs font-medium bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {destinationCount} destinations
              </span>
            </div>
          </div>

          <div
            className={cn(
              'relative flex items-center justify-center w-[194px] h-[194px]',
              'transition-all duration-500'
            )}
          >
            <CloudinaryImage
              src={imageId}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="transition-transform duration-700 group-hover:scale-110"
              objectFit="contain"
              crop="fit"
            />
            {/* Radial gradient overlay - Always visible */}
            <div className="absolute inset-0 bg-radial-gradient opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>

        {/* Bottom Content - Always visible */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="translate-y-0 transition-transform duration-500">
            <div
              className={cn(
                'bg-white/95 backdrop-blur rounded-2xl p-4',
                'shadow-[0_4px_20px_-8px_rgba(0,0,0,0.2)]',
                'transform transition-all duration-500',
                'bg-gradient-to-r from-white/95 to-primary/5',
                'border border-primary/10'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-primary relative z-10" />
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
                  </div>
                  <h3 className="font-semibold text-primary">{name}</h3>
                </div>
                <ArrowRight
                  className={cn(
                    'w-4 h-4 text-primary transform',
                    'transition-all duration-300',
                    'group-hover:translate-x-1'
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
