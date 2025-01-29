'use client';

import { cn } from '@/lib/utils';
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { shimmer, toBase64 } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

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
  opacity?: number;
};

export default function CloudinaryImage({
  src = 'pexels-ninauhlikova-287240_lsi3is',
  alt,
  sizes,
  className,
  priority = false,
  width,
  height,
  fill = false,
  crop = 'fill',
  quality = 75,
  objectFit = 'cover',
  opacity = 100,
}: CloudinaryImageProps) {
  const [blurDataUrl, setBlurDataUrl] = useState<string>(
    `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`
  );

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '50px 0px',
  });

  useEffect(() => {
    if (!priority && inView) {
      const generateBlurPlaceholder = async () => {
        try {
          const blurUrl = await fetch(
            `/api/blur-image?src=${encodeURIComponent(src)}`
          );
          const data = await blurUrl.json();
          setBlurDataUrl(data.blurDataUrl);
        } catch (error) {
          console.error('Failed to generate blur placeholder:', error);
        }
      };

      generateBlurPlaceholder();
    }
  }, [src, priority, inView]);

  const imageComponent = (
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
      loading={priority ? 'eager' : 'lazy'}
      placeholder={!priority ? 'blur' : undefined}
      blurDataURL={!priority ? blurDataUrl : undefined}
      dpr="2.0"
      opacity={opacity.toString()}
    />
  );

  if (priority) {
    return imageComponent;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative',
        fill ? 'h-full w-full' : '',
        !inView ? 'min-h-[100px]' : ''
      )}
      style={width && height ? { aspectRatio: width / height } : undefined}
    >
      {inView && imageComponent}
    </div>
  );
}
