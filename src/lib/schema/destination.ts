import { z } from 'zod';

const destinationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  heading: z.string().min(1, 'Heading is required'),
  metaTitle: z.string().min(1, 'Meta Title is required'),
  metaDescription: z.string().min(1, 'Meta Description is required'),
  metaKeywords: z
    .string()
    .min(1, 'Meta Keywords is required')
    .optional()
    .or(z.literal('')),
  description: z.string().min(8, 'Description must be at least 8 characters'),
  excerpt: z
    .string()
    .min(1, 'Excerpt is required')
    .max(200, 'Excerpt must be less than 200 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  images: z
    .array(
      z.object({
        secure_url: z.string().nonempty(),
        public_id: z.string().nonempty(),
        fileName: z.string().nonempty(),
      })
    )
    .min(1, 'At least one image is required'),
  thumbnail: z.object({
    secure_url: z.string().nonempty(),
    public_id: z.string().nonempty(),
    fileName: z.string().nonempty(),
  }),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1, 'Question is required'),
        answer: z.string().min(1, 'Answer is required'),
      })
    )
    .default([]),
});

export { destinationSchema };
