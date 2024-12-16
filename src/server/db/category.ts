'server-only';

import Category from '@/server/models/category-model';
import Destination from '@/server/models/destination-model';
import type { Document } from 'mongoose';
import { connectToDatabase } from '../mongoose';
import type { ICategory } from '@/types';
import { isValidObjectId } from 'mongoose';

export type { ICategory };
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
    const defaultLimit = parseInt(categoryQuery.limit || '8', 10);
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
      .populate({
        path: 'destinations',
        model: Destination,
      })
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

    let category;

    // Only try findById if it's a valid ObjectId
    if (isValidObjectId(id)) {
      category = await Category.findById(id).populate({
        path: 'destinations',
        model: Destination,
      });
    }

    // If not found or not a valid ObjectId, try to find by slug
    if (!category) {
      category = await Category.findOne({ slug: id }).populate({
        path: 'destinations',
        model: Destination,
      });
    }

    // If still not found, try case-insensitive slug search
    if (!category) {
      category = await Category.findOne({
        slug: { $regex: new RegExp(`^${id}$`, 'i') },
      }).populate({
        path: 'destinations',
        model: Destination,
      });
    }

    return category ? JSON.parse(JSON.stringify(category)) : null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function getAllCategories(): Promise<ICategory[]> {
  try {
    await connectToDatabase();
    const categories = await Category.find({ status: 'active' }).sort({
      name: 1,
    });
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
