import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getCldImageUrl } from 'next-cloudinary';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Shimmer effect placeholder
export function shimmer(w: number, h: number) {
  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;
}

export function toBase64(str: string) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
}

// Generate blur data URL
export async function getBlurDataUrl(src: string) {
  try {
    // Generate a small version of the image for the blur effect
    const blurImageUrl = getCldImageUrl({
      src,
      width: 64, // Small size for blur placeholder
      height: 64,
      blur: '50',
      quality: 1, // Very low quality since it's just for blur
    });

    const response = await fetch(blurImageUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${response.headers.get('content-type') || 'image/jpeg'};base64,${base64}`;
  } catch (error) {
    // Log error and fallback to shimmer effect if blur generation fails
    console.error('Failed to generate blur data URL:', error);
    return `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;
  }
}
