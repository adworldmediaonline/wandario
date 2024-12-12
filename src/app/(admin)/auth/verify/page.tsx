import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/server/mongoose';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function VerifyPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams.token;

  // Enhanced token validation
  if (!token || typeof token !== 'string') {
    console.error('Verification failed: Missing or invalid token format');
    return redirect('/auth/signin?error=InvalidToken');
  }

  // Sanitize token
  const sanitizedToken = token.trim();
  if (sanitizedToken.length < 20) {
    // Assuming your tokens are at least 20 chars
    console.error('Verification failed: Token length invalid');
    return redirect('/auth/signin?error=InvalidToken');
  }

  try {
    await connectToDatabase();
    const { User } = await import('@/server/models/user.model');
    console.log('User model imported', User);
    // Find user first without updating
    const existingUser = await User.findOne({
      verificationToken: sanitizedToken,
    });

    // Handle various user states
    if (!existingUser) {
      console.error('Verification failed: No user found with this token');
      return redirect('/auth/signin?error=InvalidToken');
    }

    if (existingUser.emailVerified) {
      console.log('User already verified:', existingUser.email);
      return redirect('/auth/signin?info=AlreadyVerified');
    }

    // Perform the verification update
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: existingUser._id,
        emailVerified: null,
      },
      {
        $set: {
          emailVerified: new Date(),
          verificationToken: undefined,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      console.error('Verification failed: Could not update user');
      return redirect('/auth/signin?error=VerificationFailed');
    }

    console.log('✓ Email verified successfully for:', updatedUser.email);
    return redirect('/auth/signin?verified=true');
  } catch (error) {
    // Enhanced error logging
    console.error('Verification error:', {
      error,
      token: sanitizedToken.substring(0, 6) + '...', // Log only first 6 chars for security
      timestamp: new Date().toISOString(),
    });

    // Determine error type and return appropriate message
    if (error instanceof Error) {
      if (error.message.includes('MongoDB')) {
        return redirect('/auth/signin?error=DatabaseError');
      }
      if (error.message.includes('validation')) {
        return redirect('/auth/signin?error=ValidationError');
      }
    }

    return redirect('/auth/signin?error=VerificationFailed');
  }
}
