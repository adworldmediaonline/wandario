import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const APP_NAME = 'wandario';

export async function sendVerificationEmail(email: string, token: string) {
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    console.error('NEXT_PUBLIC_APP_URL is not set');
    return {
      success: false,
      error: 'Missing NEXT_PUBLIC_APP_URL environment variable',
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return {
      success: false,
      error: 'Missing RESEND_API_KEY environment variable',
    };
  }

  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to: [email],
      subject: 'Verify your email address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Verify your email address</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; text-align: center;">
            <h1 style="color: #1f2937; margin-bottom: 20px;">Welcome to ${APP_NAME}!</h1>
            <p style="color: #4b5563; font-size: 16px; line-height: 24px;">
              Please verify your email address by clicking the button below:
            </p>
            <a href="${confirmLink}"
               style="display: inline-block; background-color: #2563eb; color: white;
                      padding: 12px 24px; border-radius: 6px; text-decoration: none;
                      font-weight: 600; margin: 20px 0;">
              Verify Email Address
            </a>
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              If you didn't request this email, you can safely ignore it.
            </p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="color: #2563eb; font-size: 14px; word-break: break-all;">
              ${confirmLink}
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return {
          success: false,
          error: 'Too many email attempts. Please try again later.',
        };
      }
      if (error.message.includes('invalid recipient')) {
        return { success: false, error: 'Invalid email address provided.' };
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
