'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import crypto from 'crypto';
import { sendVerificationEmail } from '../email/nodemailer';
import { connectToDatabase } from '../mongoose';

export async function signup(formData: FormData) {
  try {
    await connectToDatabase();

    const { User } = await import('@/models/user.model');

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const role = formData.get('role') as 'advertiser' | 'freelancer' | 'admin';

    // Validation for base fields
    if (!name || !email || !password || !phone || !city || !state || !role) {
      throw new Error('Missing required fields');
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // If role is admin, check if an admin already exists
    if (role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        throw new Error('An admin account already exists');
      }
    }

    // Additional validation for advertiser fields
    if (role === 'advertiser') {
      const companyName = formData.get('companyName') as string;
      const gstNumber = formData.get('gstNumber') as string;
      const address = formData.get('address') as string;

      if (!companyName || !gstNumber || !address) {
        throw new Error('Missing required advertiser fields');
      }
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user data object
    const userData = {
      name,
      email,
      password,
      phone,
      city,
      state,
      role,
      emailVerified: null,
      verificationToken,
    };

    // Add advertiser specific fields if role is advertiser
    if (role === 'advertiser') {
      Object.assign(userData, {
        companyName: formData.get('companyName'),
        gstNumber: formData.get('gstNumber'),
        address: formData.get('address'),
      });
    }

    // Create user with verification token
    const user = await User.create(userData);

    if (!user) {
      throw new Error('Error creating user');
    }

    // Debug logs
    console.log('Attempting to send verification email to:', email);
    console.log('User role:', role);
    console.log(
      'Verification token:',
      verificationToken.substring(0, 8) + '...'
    );

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationToken);

    // Debug logs
    console.log('Email sending result:', emailResult);

    if (!emailResult.success) {
      // Log the error but don't throw it
      console.error('Failed to send verification email:', emailResult.error);

      // Return success but with a warning
      return redirect('/auth/verify-request?warning=email_not_sent');
    }

    return redirect('/auth/verify-request');
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export async function authenticate(formData: FormData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const role = formData.get('role');

    if (!email || !password || !role) {
      throw new Error('Please provide all required fields');
    }

    const result = await signIn('credentials', {
      email,
      password,
      role,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error('Invalid credentials');
        default:
          throw new Error('Something went wrong');
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  try {
    const { signOut } = await import('@/auth');
    await signOut({ redirect: false });
    return redirect('/');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}
