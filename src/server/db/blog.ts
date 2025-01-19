'server-only';

import { connectToDatabase } from '../mongoose';
import type { IBlog } from '@/types';
import { isValidObjectId } from 'mongoose';
import { Blog } from '../models';
import mongoose from 'mongoose';

interface GetBlogsQuery {
  offset?: string;
  limit?: string;
  category?: string;
  search?: string;
  featured?: string;
}

interface GetBlogsResult {
  blogs: IBlog[];
  totalBlogs: number;
}

interface BlogSearchQuery {
  categoryId?: string;
  featured?: boolean;
  $or?: Array<{
    [key: string]: {
      $regex: string;
      $options: string;
    };
  }>;
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

export async function getBlogs({
  offset = '0',
  limit = '10',
  category,
  search,
  featured,
}: GetBlogsQuery): Promise<GetBlogsResult> {
  try {
    await connectToDatabase();
    const searchQuery: BlogSearchQuery = {};

    // Add category filter if provided and is a valid ObjectId
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        searchQuery.categoryId = category;
      }
    }

    // Add search filter if provided
    if (search) {
      searchQuery.$or = [
        { heading: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Add featured filter if provided
    if (featured === 'true') {
      searchQuery.featured = true;
    }

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(searchQuery)
        .populate('categoryId')
        .sort({ createdAt: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit)),
      Blog.countDocuments(searchQuery),
    ]);

    return {
      blogs: JSON.parse(JSON.stringify(blogs)),
      totalBlogs,
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}
