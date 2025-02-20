import { z } from 'zod';

export const imageSchema = z.object({
  secure_url: z.string().optional(),
  public_id: z.string().optional(),
  fileName: z.string().optional(),
});
