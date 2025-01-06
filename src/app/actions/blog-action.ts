'use server';
import { connectToDatabase } from '@/server/mongoose';
import { actionClient } from '@/lib/safe-action';
import { blogSchema } from '@/lib/schema/blog';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import Blog from '@/server/models/blog-model';
import BlogCategory from '@/server/models/blog-category-model';
import slugify from 'slugify';

export const addBlogAction = actionClient
  .schema(blogSchema)
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

    const blog = new Blog({
      ...input.parsedInput,
      name: input?.parsedInput?.name
        ? slugify(input.parsedInput.name, { lower: true })
        : '',
      slug: slugify(input.parsedInput.heading, { lower: true }),
    });

    const savedBlog = await blog.save();

    await BlogCategory.findByIdAndUpdate(
      input.parsedInput.categoryId.toString(),
      {
        $push: { blogs: savedBlog._id },
      }
    );

    revalidatePath('/dashboard/blogs');

    return {
      success: true,
      status: 201,
      message: 'Blog created successfully',
      data: JSON.parse(JSON.stringify(savedBlog)),
    };
  });

export const updateBlogAction = actionClient
  .schema(blogSchema.extend({ id: z.string() }))
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
    console.log(input.parsedInput);
    const { id, ...updateData } = input.parsedInput;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateData,
          name: updateData.name
            ? slugify(updateData.name, { lower: true })
            : '',
          images: updateData.images,
        },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return {
        success: false,
        status: 404,
        error: 'Blog not found',
      };
    }

    revalidatePath('/dashboard/blogs');

    return {
      success: true,
      status: 200,
      message: 'Blog updated successfully',
      data: JSON.parse(JSON.stringify(updatedBlog)),
    };
  });
