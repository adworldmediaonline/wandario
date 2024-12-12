'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function VerifyRequestPageContent() {
  const searchParams = useSearchParams();
  const warning = searchParams.get('warning');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-100 p-3">
              <Mail className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold">Check your email</h2>
          <p className="text-gray-600">
            We've sent you a verification link to your email address. Please
            check your inbox and click the link to verify your account.
          </p>

          {warning === 'email_not_sent' && (
            <div className="rounded-md bg-yellow-50 p-4 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Warning
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      There was an issue sending the verification email. Your
                      account has been created, but you'll need to contact
                      support to verify your email address.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or contact
              support.
            </p>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/auth/signin')}
              className="w-full"
            >
              Return to Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
