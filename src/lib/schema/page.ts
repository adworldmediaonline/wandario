import { z } from 'zod';
import { imageSchema } from './common';

export const sectionSchema = z.object({
  type: z.literal('content-image'),
  content: z.string().min(1, 'Content is required'),
  image: imageSchema,
  imagePosition: z.enum(['left', 'right']).default('right'),
  order: z.number(),
});

export const heroSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
  backgroundImage: imageSchema,
  ctaButton: z
    .object({
      label: z.string().min(1, 'Label is required'),
      href: z.string().min(1, 'URL is required'),
    })
    .optional(),
});

export const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  metaTitle: z.string().min(1, 'Meta title is required'),
  metaDescription: z.string().min(1, 'Meta description is required'),
  metaKeywords: z.string().optional(),
  hero: heroSchema,
  sections: z.array(sectionSchema),
  status: z.enum(['published', 'draft']).default('draft'),
});
