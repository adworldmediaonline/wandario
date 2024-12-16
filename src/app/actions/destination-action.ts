'use server';
import { connectToDatabase } from '@/server/mongoose';
import { actionClient } from '@/lib/safe-action';
import { destinationSchema } from '@/lib/schema/destination';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import Destination from '@/server/models/destination-model';

export const addDestinationAction = actionClient
  .schema(destinationSchema)
  .action(async ({ parsedInput }) => {
    if (!parsedInput) {
      return {
        success: false,
        status: 400,
        error: 'validation error',
      };
    }

    const connection = await connectToDatabase();

    if (!connection) {
      return {
        success: false,
        status: 500,
        error: 'Database connection failed',
      };
    }

    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        status: 401,
        error: 'Unauthorized',
      };
    }

    const destination = new Destination(parsedInput);
    const destinationData = JSON.parse(
      JSON.stringify(await destination.save())
    );

    revalidatePath('/dashboard/destinations');

    return {
      success: true,
      status: 201,
      message: 'Destination created successfully',
      data: destinationData,
    };
  });

export const updateDestinationAction = actionClient
  .schema(destinationSchema.extend({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    if (!parsedInput) {
      return {
        success: false,
        status: 400,
        error: 'validation error',
      };
    }

    const connection = await connectToDatabase();
    if (!connection) {
      return {
        success: false,
        status: 500,
        error: 'Database connection failed',
      };
    }

    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        status: 401,
        error: 'Unauthorized',
      };
    }

    const { id, ...updateData } = parsedInput;
    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedDestination) {
      return {
        success: false,
        status: 404,
        error: 'Destination not found',
      };
    }

    revalidatePath('/dashboard/destinations');

    return {
      success: true,
      status: 201,
      message: 'Destination updated successfully',
      data: JSON.parse(JSON.stringify(updatedDestination)),
    };
  });
