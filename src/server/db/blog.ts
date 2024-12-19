'server-only';

import { connectToDatabase } from '../mongoose';
import type { IBlog } from '@/types';
import { isValidObjectId } from 'mongoose';
import { Blog } from '../models';

interface SearchQuery {
  status: string;
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
  categoryId?: string;
}

export async function getBlogById(id: string): Promise<IBlog | null> {
  try {
    await connectToDatabase();

    let blog;

    if (isValidObjectId(id)) {
      blog = await Blog.findById(id).populate('categoryId');
    }

    if (!blog) {
      blog = await Blog.findOne({ slug: id }).populate('categoryId');
    }

    if (!blog) {
      blog = await Blog.findOne({
        slug: { $regex: new RegExp(`^${id}$`, 'i') },
      }).populate('categoryId');
    }

    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function getBlogs(query: {
  search?: string;
  category?: string;
  offset?: string;
  limit?: string;
}): Promise<{
  blogs: IBlog[];
  totalBlogs: number;
}> {
  try {
    await connectToDatabase();
    const defaultLimit = parseInt(query.limit || '12', 10);
    const safeOffset = Math.max(0, parseInt(query.offset || '0', 10));

    const searchQuery: SearchQuery = { status: 'active' };

    if (query.search) {
      searchQuery.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    if (query.category) {
      searchQuery.categoryId = query.category;
    }

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(searchQuery)
        .populate('categoryId')
        .sort({ createdAt: -1 })
        .skip(safeOffset)
        .limit(defaultLimit),
      Blog.countDocuments(searchQuery),
    ]);

    return {
      blogs: JSON.parse(JSON.stringify(blogs)),
      totalBlogs,
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { blogs: [], totalBlogs: 0 };
  }
}
