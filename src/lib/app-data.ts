import { Camera, Image, Aperture, Video } from 'lucide-react';
import type { Service } from '@/components/ui/service-showcase';

export const photographyServices: Service[] = [
  {
    icon: Camera,
    title: 'Professional Photography',
    description:
      'Expert photography services for all your needs, from events to portraits.',
  },
  {
    icon: Image,
    title: 'Photo Editing',
    description:
      'Professional retouching and editing to make your photos perfect.',
  },
  {
    icon: Aperture,
    title: 'Studio Sessions',
    description:
      'Professional studio photography with state-of-the-art equipment.',
  },
  {
    icon: Video,
    title: 'Videography',
    description: 'High-quality video production for events and commercial use.',
  },
];

export const showcaseData = {
  title: 'Photography Services',
  description:
    'Professional photography services tailored to capture your moments.',
  services: photographyServices,
  backgroundImageId: 'testing/photography',
};
