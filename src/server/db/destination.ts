'server-only';

import { connectToDatabase } from '../mongoose';
import Destination from '@/server/models/destination-model';
import type { IDestination } from '@/types';
import { isValidObjectId } from 'mongoose';

interface SearchQuery {
  status: string;
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
  categoryId?: string;
}

export async function getDestinationById(
  id: string
): Promise<IDestination | null> {
  try {
    await connectToDatabase();

    let destination;

    if (isValidObjectId(id)) {
      destination = await Destination.findById(id).populate('categoryId');
    }

    if (!destination) {
      destination = await Destination.findOne({ slug: id }).populate(
        'categoryId'
      );
    }

    if (!destination) {
      destination = await Destination.findOne({
        slug: { $regex: new RegExp(`^${id}$`, 'i') },
      }).populate('categoryId');
    }

    return destination ? JSON.parse(JSON.stringify(destination)) : null;
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
}

export async function getDestinations(query: {
  search?: string;
  category?: string;
  offset?: string;
  limit?: string;
}): Promise<{
  destinations: IDestination[];
  totalDestinations: number;
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

    const [destinations, totalDestinations] = await Promise.all([
      Destination.find(searchQuery)
        .populate('categoryId')
        .sort({ createdAt: -1 })
        .skip(safeOffset)
        .limit(defaultLimit),
      Destination.countDocuments(searchQuery),
    ]);

    return {
      destinations: JSON.parse(JSON.stringify(destinations)),
      totalDestinations,
    };
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return { destinations: [], totalDestinations: 0 };
  }
}
