'use server';

import { connectToDatabase } from '@/server/mongoose';
import { actionClient } from '@/lib/safe-action';
import { pageSchema } from '@/lib/schema/page';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Page } from '@/server/models';
import slugify from 'slugify';
import { deleteCloudinaryImage } from '@/lib/cloudinary';
import type { IPage, ISection } from '@/types';

type ActionResponse = {
  success: boolean;
  status: number;
  message?: string;
  error?: string;
  data?: IPage;
};

export const createPageAction = actionClient
  .schema(pageSchema)
  .action(async (input): Promise<ActionResponse> => {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        status: 401,
        error: 'Unauthorized',
      };
    }

    await connectToDatabase();

    const page = new Page({
      ...input.parsedInput,
      slug: slugify(input.parsedInput.title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        trim: true,
      }),
    });

    const savedPage = await page.save();

    revalidatePath('/');
    revalidatePath('/dashboard/pages');

    return {
      success: true,
      status: 201,
      message: 'Page created successfully',
      data: JSON.parse(JSON.stringify(savedPage)),
    };
  });

export const updatePageAction = actionClient
  .schema(pageSchema.extend({ id: z.string() }))
  .action(async (input): Promise<ActionResponse> => {
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

    // Get current page to compare images
    const currentPage = await Page.findById(id);
    if (!currentPage) {
      return {
        success: false,
        status: 404,
        error: 'Page not found',
      };
    }

    // Handle hero image changes
    if (
      currentPage.hero?.backgroundImage?.public_id &&
      currentPage.hero.backgroundImage.public_id !==
        updateData.hero?.backgroundImage?.public_id
    ) {
      await deleteCloudinaryImage(currentPage.hero.backgroundImage.public_id);
    }

    // Handle section image changes
    if (currentPage.sections && updateData.sections) {
      const currentImages = currentPage.sections
        .map((section: ISection) => section.image?.public_id)
        .filter(Boolean) as string[];

      const newImages = updateData.sections
        .map((section: ISection) => section.image?.public_id)
        .filter(Boolean) as string[];

      const imagesToDelete = currentImages.filter(
        img => !newImages.includes(img)
      );

      await Promise.all(imagesToDelete.map(img => deleteCloudinaryImage(img)));
    }

    const updatedPage = await Page.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateData,
          slug: slugify(updateData.title, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
            trim: true,
          }),
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    revalidatePath('/');
    revalidatePath('/dashboard/pages');

    return {
      success: true,
      status: 200,
      message: 'Page updated successfully',
      data: JSON.parse(JSON.stringify(updatedPage)),
    };
  });

export const deletePageAction = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async (input): Promise<ActionResponse> => {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: false,
        status: 401,
        error: 'Unauthorized',
      };
    }

    await connectToDatabase();

    const page = await Page.findById(input.parsedInput.id);
    if (!page) {
      return {
        success: false,
        status: 404,
        error: 'Page not found',
      };
    }

    // Delete hero image if exists
    if (page.hero?.backgroundImage?.public_id) {
      await deleteCloudinaryImage(page.hero.backgroundImage.public_id);
    }

    // Delete section images if exist
    if (page.sections) {
      const images = page.sections
        .map((section: ISection) => section.image?.public_id)
        .filter(Boolean) as string[];
      await Promise.all(images.map(img => deleteCloudinaryImage(img)));
    }

    await Page.findByIdAndDelete(input.parsedInput.id);

    revalidatePath('/');
    revalidatePath('/dashboard/pages');

    return {
      success: true,
      status: 200,
      message: 'Page deleted successfully',
    };
  });

export const deleteImageFromPage = actionClient
  .schema(
    z.object({
      pageId: z.string(),
      sectionIndex: z.number(),
    })
  )
  .action(async (input): Promise<ActionResponse> => {
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
      const { pageId, sectionIndex } = input.parsedInput;
      const page = await Page.findById(pageId);

      if (!page) {
        return {
          success: false,
          status: 404,
          error: 'Page not found',
        };
      }

      if (!page.sections[sectionIndex]?.image?.public_id) {
        return {
          success: false,
          status: 404,
          error: 'Image not found',
        };
      }

      const imageId = page.sections[sectionIndex].image.public_id;
      const cloudinaryResult = await deleteCloudinaryImage(imageId);

      if (!cloudinaryResult) {
        return {
          success: false,
          status: 500,
          error: 'Failed to delete image from storage',
        };
      }

      page.sections[sectionIndex].image = {};
      await page.save();

      revalidatePath('/');
      revalidatePath(`/dashboard/pages/${pageId}/edit`);

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
