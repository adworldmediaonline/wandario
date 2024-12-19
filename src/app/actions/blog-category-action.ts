'use server';
import { connectToDatabase } from '@/server/mongoose';
import BlogCategory from '@/server/models/blog-category-model';
import { actionClient } from '@/lib/safe-action';
import { blogCategorySchema } from '@/lib/schema/blog-category';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import slugify from 'slugify';
export const addBlogCategoryAction = actionClient
  .schema(blogCategorySchema)
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

    const blogCategory = new BlogCategory({
      ...parsedInput,
      name: parsedInput.name.toLowerCase(),
      slug: slugify(parsedInput.name, { lower: true }),
    });

    const blogCategoryData = JSON.parse(
      JSON.stringify(await blogCategory.save())
    );

    revalidatePath('/dashboard/blogs-categories');

    return {
      success: true,
      status: 201,
      message: 'Blog category created successfully',
      data: blogCategoryData,
    };
  });

export const updateBlogCategoryAction = actionClient
  .schema(blogCategorySchema.extend({ id: z.string() }))
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
    const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      {
        ...updateData,
        name: updateData.name.toLowerCase(),
      },
      { new: true }
    );

    if (!updatedBlogCategory) {
      return {
        success: false,
        status: 404,
        error: 'Blog category not found',
      };
    }

    revalidatePath('/dashboard/blogs-categories');

    return {
      success: true,
      status: 201,
      message: 'Blog category updated successfully',
      data: JSON.parse(JSON.stringify(updatedBlogCategory)),
    };
  });
