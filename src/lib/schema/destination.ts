import { z } from 'zod';

const destinationSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  name: z.string().min(1, 'Name is required'),
  heading: z.string().min(1, 'Heading is required'),
  metaTitle: z.string().min(1, 'Meta Title is required'),
  metaDescription: z.string().min(1, 'Meta Description is required'),
  metaKeywords: z
    .string()
    .min(1, 'Meta Keywords is required')
    .optional()
    .or(z.literal('')),
  excerpt: z
    .string()
    .min(1, 'Excerpt is required')
    .max(400, 'Excerpt must be less than 400 characters'),
  description: z.string().min(8, 'Description must be at least 8 characters'),

  images: z
    .array(
      z.object({
        secure_url: z.string(),
        public_id: z.string(),
        fileName: z.string(),
      })
    )
    .min(1, 'Please upload at least one image'),
  thumbnail: z
    .object({
      secure_url: z.string(),
      public_id: z.string(),
      fileName: z.string(),
    })
    .refine(
      data => data.secure_url !== '' && data.public_id !== '',
      'Please upload a thumbnail image'
    ),
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
