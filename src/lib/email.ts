import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import * as React from 'react';
import { ContactEmail } from './email/templates/contact-email';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Use TLS
  auth: {
    user: process.env.HOSTINGER_EMAIL,
    pass: process.env.HOSTINGER_PASSWORD,
  },
  tls: {
    ciphers: 'TLSv1.2',
  },
  requireTLS: true,
  debug: true,
});

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

interface SendContactEmailProps {
  to: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  try {
    const info = await transporter.sendMail({
      from: `"Wandario" <${process.env.HOSTINGER_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendContactEmail({
  to,
  name,
  email,
  phone,
  subject,
  message,
}: SendContactEmailProps) {
  try {
    const emailHtml = await render(
      React.createElement(ContactEmail, {
        name,
        email,
        phone,
        subject,
        message,
      })
    );

    const info = await transporter.sendMail({
      from: `"Wandario" <${process.env.HOSTINGER_EMAIL}>`,
      to,
      subject: 'New Contact Form Submission - Wandario',
      html: emailHtml,
    });

    console.log('Contact form email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return { success: false, error };
  }
}
