'server-only';

import Category from '@/server/models/category-model';
import type { Document } from 'mongoose';

export interface ICategory {
  name: string;
}

export type CategoryType = Document & ICategory;

export async function getCategories(): Promise<{
  categories: ICategory[];
}> {
  try {
    const categories = await Category.find({});
    return { categories };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { categories: [] };
  }
}
