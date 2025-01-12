import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    console.log('Testing email configuration...');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const data = await resend.emails.send({
      from: 'Wandario <onboarding@resend.dev>',
      to: 'delivered@resend.dev', // This is a test email address provided by Resend
      subject: 'Test Email',
      html: '<p>This is a test email to verify the configuration.</p>',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
