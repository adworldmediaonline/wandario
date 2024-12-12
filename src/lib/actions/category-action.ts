'use server';
import { connectToDatabase } from '@/lib/mongoose';
import Category from '@/models/category-model';
import { actionClient } from '@/lib/safe-action';
import { categorySchema } from '@/lib/schema/category';
import { auth } from '@/auth';

export const addCategoryAction = actionClient
  .schema(categorySchema)
  .action(async ({ parsedInput }) => {
    try {
      if (!parsedInput) {
        return {
          success: false,
          status: 400,
          error: 'validation error',
        };
      }

      await connectToDatabase();

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

      return {
        success: true,
        status: 201,
        message: 'Category created successfully',
        data: categoryData,
      };
    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
        details: error,
        status: 500,
      };
    }
  });
