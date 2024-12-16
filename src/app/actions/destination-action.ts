'use server';
import { connectToDatabase } from '@/server/mongoose';
import { actionClient } from '@/lib/safe-action';
import { destinationSchema } from '@/lib/schema/destination';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import Destination from '@/server/models/destination-model';
import Category from '@/server/models/category-model';
import slugify from 'slugify';

export const addDestinationAction = actionClient
  .schema(destinationSchema)
  .action(async input => {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        status: 401,
        error: 'Unauthorized',
      };
    }

    await connectToDatabase();

    const destination = new Destination({
      ...input.parsedInput,
      name: input.parsedInput.name.toLowerCase(),
      slug: slugify(input.parsedInput.name, { lower: true }),
    });

    const savedDestination = await destination.save();

    await Category.findByIdAndUpdate(input.parsedInput.categoryId, {
      $push: { destinations: savedDestination._id },
    });

    revalidatePath('/dashboard/destinations');

    return {
      success: true,
      status: 201,
      message: 'Destination created successfully',
      data: JSON.parse(JSON.stringify(savedDestination)),
    };
  });

export const updateDestinationAction = actionClient
  .schema(destinationSchema.extend({ id: z.string() }))
  .action(async input => {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        status: 401,
        error: 'Unauthorized',
      };
    }

    await connectToDatabase();

    const { id, ...updateData } = input.parsedInput;
    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      {
        ...updateData,
        name: updateData.name.toLowerCase(),
      },
      { new: true }
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
      status: 200,
      message: 'Destination updated successfully',
      data: JSON.parse(JSON.stringify(updatedDestination)),
    };
  });
