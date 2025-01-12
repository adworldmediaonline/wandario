import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import * as React from 'react';
import { VerifyEmail } from './templates/verify-email';

const FROM_EMAIL = process.env.HOSTINGER_EMAIL;
const APP_NAME = 'Wandario';
//
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.HOSTINGER_EMAIL,
    pass: process.env.HOSTINGER_PASSWORD,
  },
  tls: { ciphers: 'TLSv1.2' },
  requireTLS: true,
  debug: true,
});

export async function sendVerificationEmail(email: string, token: string) {
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    console.error('NEXT_PUBLIC_APP_URL is not set');
    return {
      success: false,
      error: 'Missing NEXT_PUBLIC_APP_URL environment variable',
    };
  }

  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  const emailHtml = await render(
    React.createElement(VerifyEmail, { confirmLink })
  );

  try {
    await transporter.sendMail({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to: email,
      subject: 'Verify your email address',
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
