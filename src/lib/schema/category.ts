import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(8, 'Description must be at least 8 characters'),
  excerpt: z
    .string()
    .min(1, 'Excerpt is required')
    .max(200, 'Excerpt must be less than 200 characters'),
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
});

export { categorySchema };
