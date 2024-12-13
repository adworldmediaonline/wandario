'use server';
import { connectToDatabase } from '@/server/mongoose';
import Category from '@/server/models/category-model';
import { actionClient } from '@/lib/safe-action';
import { categorySchema } from '@/lib/schema/category';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { z } from 'zod';

export const addCategoryAction = actionClient
  .schema(categorySchema)
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

    const category = new Category(parsedInput);
    const categoryData = JSON.parse(JSON.stringify(await category.save()));

    revalidatePath('/dashboard/categories');

    return {
      success: true,
      status: 201,
      message: 'Category created successfully',
      data: categoryData,
    };
  });

export const updateCategoryAction = actionClient
  .schema(categorySchema.extend({ id: z.string() }))
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
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      return {
        success: false,
        status: 404,
        error: 'Category not found',
      };
    }

    revalidatePath('/dashboard/categories');

    return {
      success: true,
      status: 201,
      message: 'Category updated successfully',
      data: JSON.parse(JSON.stringify(updatedCategory)),
    };
  });
