'server-only';

import { BlogCategory, Blog } from '../models';
import type { Document } from 'mongoose';
import { connectToDatabase } from '../mongoose';
import type { IBlogCategory } from '@/types';
import { isValidObjectId } from 'mongoose';

export type { IBlogCategory };
export type BlogCategoryType = Document & IBlogCategory;

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

export async function getBlogCategories(categoryQuery: CategoryQuery): Promise<{
  categories: IBlogCategory[];
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

    const totalCategories = await BlogCategory.countDocuments(query);
    const categories = await BlogCategory.find(query)
      .populate({
        path: 'blogs',
        model: Blog,
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

export async function getBlogCategoryById(
  id: string
): Promise<IBlogCategory | null> {
  try {
    await connectToDatabase();

    let category;

    // Only try findById if it's a valid ObjectId
    if (isValidObjectId(id)) {
      category = await BlogCategory.findById(id).populate({
        path: 'blogs',
        model: Blog,
      });
    }

    // If not found or not a valid ObjectId, try to find by slug
    if (!category) {
      category = await BlogCategory.findOne({ slug: id }).populate({
        path: 'blogs',
        model: Blog,
      });
    }

    // If still not found, try case-insensitive slug search
    if (!category) {
      category = await BlogCategory.findOne({
        slug: { $regex: new RegExp(`^${id}$`, 'i') },
      }).populate({
        path: 'blogs',
        model: Blog,
      });
    }

    return category ? JSON.parse(JSON.stringify(category)) : null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function getAllBlogCategories(): Promise<IBlogCategory[]> {
  try {
    await connectToDatabase();
    const categories = await BlogCategory.find({ status: 'active' }).sort({
      name: 1,
    });
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
