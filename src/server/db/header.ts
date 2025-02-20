'server-only';

import { connectToDatabase } from '../mongoose';
import type { IHeader } from '@/types';
import { isValidObjectId } from 'mongoose';
import { Header } from '../models';

interface SearchQuery {
  status?: string;
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
}

interface GetHeadersQuery {
  offset?: string;
  limit?: string;
  search?: string;
  status?: string;
}

interface GetHeadersResult {
  headers: IHeader[];
  totalHeaders: number;
}

export async function getHeaderById(id: string): Promise<IHeader | null> {
  try {
    await connectToDatabase();

    let header;

    if (isValidObjectId(id)) {
      header = await Header.findById(id);
    }

    if (!header) {
      header = await Header.findOne({ slug: id });
    }

    if (!header) {
      header = await Header.findOne({
        slug: { $regex: new RegExp(`^${id}$`, 'i') },
      });
    }

    return header ? JSON.parse(JSON.stringify(header)) : null;
  } catch (error) {
    console.error('Error fetching header:', error);
    return null;
  }
}

export async function getHeaders({
  offset = '0',
  limit = '10',
  search,
  status = 'all',
}: GetHeadersQuery): Promise<GetHeadersResult> {
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

    const [headers, totalHeaders] = await Promise.all([
      Header.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit)),
      Header.countDocuments(searchQuery),
    ]);

    return {
      headers: JSON.parse(JSON.stringify(headers)),
      totalHeaders,
    };
  } catch (error) {
    console.error('Error fetching headers:', error);
    throw new Error('Failed to fetch headers');
  }
}

export async function getPrimaryHeader(): Promise<IHeader | null> {
  try {
    await connectToDatabase();
    const header = await Header.findOne({
      status: 'published',
      // type: 'primary',
    });
    if (!header) {
      // throw new Error('Primary header not found');
      return null;
    }

    return JSON.parse(JSON.stringify(header));
  } catch (error) {
    console.error('Error fetching primary header:', error);
    // throw new Error('Failed to fetch primary header');
    return null;
  }
}
