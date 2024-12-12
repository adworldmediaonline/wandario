import { sendVerificationEmail as sendWithResend } from './resend';
import { sendVerificationEmail as sendWithNodemailer } from './nodemailer';

const emailProvider = process.env.EMAIL_PROVIDER || 'resend';
console.log('Current email provider:', emailProvider);

export async function sendVerificationEmail(email: string, token: string) {
  console.log('Using email provider:', emailProvider);
  return emailProvider === 'nodemailer'
    ? sendWithNodemailer(email, token)
    : sendWithResend(email, token);
}
