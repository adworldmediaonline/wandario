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

interface CategoryQuery {
  search?: string;
  offset?: string;
  limit?: string;
  category?: string;
}

interface CategorySearchQuery {
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
}

export async function getCategories(categoryQuery: CategoryQuery): Promise<{
  categories: ICategory[];
  totalCategories: number;
}> {
  try {
    await connectToDatabase();
    const defaultLimit = parseInt(categoryQuery.limit || '5', 10);
    const safeOffset = Math.max(0, parseInt(categoryQuery.offset || '0', 10));

    const category = categoryQuery.category;
    const search = categoryQuery.search;

    let query: CategorySearchQuery = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      };
    }

    if (category) {
      query.$or = [{ name: { $regex: category, $options: 'i' } }];
    }

    const totalCategories = await Category.countDocuments(query);
    const categories = await Category.find(query)
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
