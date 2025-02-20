'use server';
import { actionClient } from '@/lib/safe-action';
import { headerSchema } from '@/lib/schema/header';
import { connectToDatabase } from '@/server/mongoose';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { Header } from '@/server/models';
import { deleteCloudinaryImage } from './cloudinary';
import { z } from 'zod';

export const addHeaderAction = actionClient
  .schema(headerSchema)
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

    const header = await Header.create(input.parsedInput);

    revalidatePath('/');
    revalidatePath('/dashboard/header');

    return {
      success: true,
      status: 200,
      message: 'Header created successfully',
      data: JSON.parse(JSON.stringify(header)),
    };
  });

export const updateHeaderAction = actionClient
  .schema(headerSchema.extend({ id: z.string() }))
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

    // Get current header to compare logo
    const currentHeader = await Header.findOne();
    const { id, ...updateData } = input.parsedInput;

    // If logo changed, delete old one
    if (
      currentHeader?.logo?.public_id &&
      currentHeader.logo.public_id !== updateData.logo?.public_id
    ) {
      await deleteCloudinaryImage(currentHeader.logo.public_id);
    }

    // Update or create header
    const header = await Header.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    revalidatePath('/');
    revalidatePath('/dashboard/header');
    revalidatePath(`/dashboard/header/${id}`);

    return {
      success: true,
      status: 200,
      message: 'Header updated successfully',
      data: JSON.parse(JSON.stringify(header)),
    };
  });
