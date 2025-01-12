'use server';

import { actionClient } from '@/lib/safe-action';
import Contact from '@/server/models/contact-model';
import { contactSchema } from '@/lib/schema/contact-us-form';
import { connectToDatabase } from '@/server/mongoose';
import { sendContactEmail } from '@/lib/email';

export const contactAction = actionClient
  .schema(contactSchema)
  .action(async ({ parsedInput }) => {
    if (!parsedInput) {
      return {
        success: false,
        status: 400,
        error: 'validation error',
      };
    }

    try {
      await connectToDatabase();

      // Create contact instance but don't save yet
      const contact = new Contact(parsedInput);

      // Run database save and email sending concurrently
      await Promise.all([
        // Save to database
        contact.save(),
        // Send email notification
        sendContactEmail({
          to: process.env.HOSTINGER_EMAIL || '',
          ...parsedInput,
        }),
      ]);

      return {
        success: true,
        status: 201,
        message: 'Message sent successfully',
      };
    } catch (error) {
      console.error('Error in contact action:', error);
      return {
        success: false,
        status: 500,
        error: 'Failed to send message',
      };
    }
  });
