'use client';

import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import type { IDestination } from '@/types';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: IDestination;
  className?: string;
}

export function DestinationCard({
  destination,
  className,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination._id}`}
      className={cn(
        'group block relative overflow-hidden rounded-xl sm:rounded-[20px]',
        'transition-all duration-300 hover:-translate-y-1',
        'shadow-lg hover:shadow-xl',
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <CldImage
          alt={destination.name}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src={destination.thumbnail?.public_id || 'testing/hero-banner'}
          fill
          sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/90"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)',
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
            {destination.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
