import { cn } from '@/lib/utils';
import CloudinaryImage from './cloudinary-image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  name: string;
  imageId: string;
  href: string;
  location?: string;
  className?: string;
}

export function DestinationCard({
  name,
  imageId,
  href,
  location,
  className,
}: DestinationCardProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          'group relative overflow-hidden rounded-2xl bg-white',
          'transition-all duration-300 hover:-translate-y-1',
          'shadow-sm hover:shadow-xl',
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <CloudinaryImage
            src={imageId}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-lg font-semibold">{name}</h3>
          {location && (
            <div className="mt-1 flex items-center gap-1 text-sm text-white/90">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
