import { z } from 'zod';

const destinationSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(8),
  categoryId: z.string().min(1, 'Category is required'),
  thumbnail: z.object({
    secure_url: z.string().nonempty(),
    public_id: z.string().nonempty(),
    fileName: z.string().nonempty(),
  }),
});

export { destinationSchema };
