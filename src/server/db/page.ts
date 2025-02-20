'server-only';

import { connectToDatabase } from '../mongoose';
import type { IPage } from '@/types';
import { isValidObjectId } from 'mongoose';
import { Page } from '../models';

interface SearchQuery {
  status?: string;
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
}

interface GetPagesQuery {
  offset?: string;
  limit?: string;
  search?: string;
  status?: string;
}

interface GetPagesResult {
  pages: IPage[];
  totalPages: number;
}

export async function getPageById(id: string): Promise<IPage | null> {
  try {
    await connectToDatabase();

    let page;

    if (isValidObjectId(id)) {
      page = await Page.findById(id);
    }

    if (!page) {
      page = await Page.findOne({ slug: id });
    }

    if (!page) {
      page = await Page.findOne({
        slug: { $regex: new RegExp(`^${id}$`, 'i') },
      });
    }

    return page ? JSON.parse(JSON.stringify(page)) : null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function getPublishedPageById(id: string): Promise<IPage | null> {
  try {
    await connectToDatabase();

    let page;

    if (isValidObjectId(id)) {
      page = await Page.findOne({ _id: id, status: 'published' });
    }

    if (!page) {
      page = await Page.findOne({ slug: id, status: 'published' });
    }

    if (!page) {
      page = await Page.findOne({
        slug: { $regex: new RegExp(`^${id}$`, 'i') },
        status: 'published',
      });
    }

    return page ? JSON.parse(JSON.stringify(page)) : null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function getPages({
  offset = '0',
  limit = '10',
  search,
  status = 'all',
}: GetPagesQuery): Promise<GetPagesResult> {
  try {
    await connectToDatabase();
    const searchQuery: SearchQuery = {};

    if (status !== 'all') {
      searchQuery.status = status;
    }

    if (search) {
      searchQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { metaTitle: { $regex: search, $options: 'i' } },
        { metaDescription: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    const [pages, totalPages] = await Promise.all([
      Page.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit)),
      Page.countDocuments(searchQuery),
    ]);

    return {
      pages: JSON.parse(JSON.stringify(pages)),
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw new Error('Failed to fetch pages');
  }
}
