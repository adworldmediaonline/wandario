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
import { deleteCloudinaryImage } from '@/lib/cloudinary';

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
        ? slugify(input.parsedInput.name, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
            trim: true,
          })
        : '',
      slug: slugify(input.parsedInput.heading, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        trim: true,
      }),
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

    const { id, ...updateData } = input.parsedInput;

    // Get the current blog to compare images
    const currentBlog = await Blog.findById(id);
    if (!currentBlog) {
      return {
        success: false,
        status: 404,
        error: 'Blog not found',
      };
    }

    // Find deleted images by comparing current and new images
    const currentImages = currentBlog.images || [];
    const newImages = updateData.images || [];
    const deletedImages = currentImages.filter(
      (oldImg: { public_id: string }) =>
        !newImages.some(newImg => newImg.public_id === oldImg.public_id)
    );

    // Delete removed images from Cloudinary
    for (const image of deletedImages) {
      await deleteCloudinaryImage(image.public_id);
    }

    // Check if thumbnail was changed and delete old one
    if (
      currentBlog.thumbnail?.public_id &&
      currentBlog.thumbnail.public_id !== updateData.thumbnail?.public_id
    ) {
      await deleteCloudinaryImage(currentBlog.thumbnail.public_id);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateData,
          name: updateData.name
            ? slugify(updateData.name, {
                lower: true,
                remove: /[*+~.()'"!:@]/g,
                trim: true,
              })
            : '',
          images: updateData.images,
          thumbnail: updateData.thumbnail,
        },
      },
      { new: true }
    );

    revalidatePath('/dashboard/blogs');

    return {
      success: true,
      status: 200,
      message: 'Blog updated successfully',
      data: JSON.parse(JSON.stringify(updatedBlog)),
    };
  });

export const deleteImageFromBlog = actionClient
  .schema(
    z.object({
      blogId: z.string(),
      publicId: z.string(),
      fieldName: z.enum(['images', 'thumbnail']),
    })
  )
  .action(async ({ parsedInput: { blogId, publicId, fieldName } }) => {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        status: 401,
        error: 'Unauthorized',
      };
    }

    await connectToDatabase();

    try {
      // Delete from Cloudinary
      const cloudinaryResult = await deleteCloudinaryImage(publicId);
      if (!cloudinaryResult) {
        return {
          success: false,
          status: 500,
          error: 'Failed to delete image from storage',
        };
      }

      // Update database based on field type
      if (fieldName === 'thumbnail') {
        await Blog.findByIdAndUpdate(blogId, {
          $unset: { thumbnail: 1 },
        });
      } else {
        await Blog.findByIdAndUpdate(blogId, {
          $pull: { images: { public_id: publicId } },
        });
      }

      revalidatePath('/dashboard/blogs');

      return {
        success: true,
        status: 200,
        message: 'Image deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting image:', error);
      return {
        success: false,
        status: 500,
        error: 'Failed to delete image',
      };
    }
  });
