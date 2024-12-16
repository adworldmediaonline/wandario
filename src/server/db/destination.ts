'server-only';

import type { Document } from 'mongoose';
import { connectToDatabase } from '../mongoose';
import Destination from '@/server/models/destination-model';
import type { IDestination } from '@/types';

export type { IDestination };
export type DestinationType = Document & IDestination;

interface DestinationQuery {
  search?: string;
  offset?: string;
  limit?: string;
  category?: string;
}

interface DestinationSearchQuery {
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
}

export async function getDestinations(
  destinationQuery: DestinationQuery
): Promise<{
  destinations: IDestination[];
  totalDestinations: number;
}> {
  try {
    await connectToDatabase();
    const defaultLimit = parseInt(destinationQuery.limit || '5', 10);
    const safeOffset = Math.max(
      0,
      parseInt(destinationQuery.offset || '0', 10)
    );

    const category = destinationQuery.category;
    const search = destinationQuery.search;

    let query: DestinationSearchQuery = {};

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

    const totalDestinations = await Destination.countDocuments(query);
    const destinations = await Destination.find(query)
      .sort({ createdAt: -1 })
      .skip(safeOffset)
      .limit(defaultLimit);

    return {
      destinations: JSON.parse(JSON.stringify(destinations)),
      totalDestinations,
    };
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return { destinations: [], totalDestinations: 0 };
  }
}

export async function getDestinationById(
  id: string
): Promise<IDestination | null> {
  try {
    await connectToDatabase();
    const destination = await Destination.findById(id);
    return destination ? JSON.parse(JSON.stringify(destination)) : null;
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
}
