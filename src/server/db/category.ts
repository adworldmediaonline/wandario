'server-only';

import Category from '@/server/models/category-model';
import type { Document } from 'mongoose';
import { connectToDatabase } from '../mongoose';

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  status: string;
  thumbnail: {
    secure_url: string;
    public_id: string;
    fileName: string;
  };
  destinations: string[];
  createdAt: Date;
}

export type CategoryType = Document & ICategory;

export async function getCategories(
  search: string,
  offset: number,
  limit?: number
): Promise<{
  categories: ICategory[];
  totalCategories: number;
}> {
  try {
    await connectToDatabase();
    const defaultLimit = limit || 5; // Default to 5 if no limit provided
    const safeOffset = Math.max(0, offset);

    if (search) {
      const searchResults = await Category.find({
        name: { $regex: search, $options: 'i' },
      })
        .sort({ createdAt: -1 })
        .limit(limit || 1000);

      return {
        categories: JSON.parse(JSON.stringify(searchResults)),
        totalCategories: searchResults.length,
      };
    }

    const totalCategories = await Category.countDocuments();

    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .skip(safeOffset)
      .limit(defaultLimit);

    return {
      categories: JSON.parse(JSON.stringify(categories)),
      totalCategories,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { categories: [], totalCategories: 0 };
  }
}

export async function getCategoryById(id: string): Promise<ICategory | null> {
  try {
    await connectToDatabase();
    const category = await Category.findById(id);
    return category ? JSON.parse(JSON.stringify(category)) : null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}
