'use client';

import { cn } from '@/lib/utils';
import { CldImage } from 'next-cloudinary';

type CloudinaryImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  crop?: 'fill' | 'fit' | 'crop' | 'thumb' | 'scale';
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
};

export default function CloudinaryImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
  width,
  height,
  fill = false,
  crop = 'fill',
  quality = 80,
  objectFit = 'cover',
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={cn(`object-${objectFit}`, className)}
      sizes={sizes}
      crop={crop}
      quality={quality}
      format="webp"
      priority={priority}
    />
  );
}
