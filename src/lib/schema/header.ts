import { z } from 'zod';
import { imageSchema } from './common';

const menuItemSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  href: z.string().min(1, 'URL is required'),
  order: z.number(),
  isActive: z.boolean(),
  useExistingPage: z.boolean().default(true),
});

export const ctaButtonSchema = z.object({
  label: z.string().min(1, 'Label is required').optional().or(z.literal('')),
  href: z.string().min(1, 'URL is required').optional().or(z.literal('')),
  isActive: z.boolean().default(false),
});

export const headerSchema = z.object({
  logo: imageSchema.optional(),
  menuItems: z
    .array(menuItemSchema)
    .min(1, { message: 'At least one menu item is required' }),
  ctaButton: ctaButtonSchema.optional(),
  status: z.enum(['published', 'draft']).optional().default('draft'),
  type: z.enum(['primary', 'secondary']).optional().default('primary'),
});
