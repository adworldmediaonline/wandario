'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="w-full py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-lg rounded-2xl border border-red-100 bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Error Icon */}
            <div className="rounded-full bg-red-50 p-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>

            {/* Error Message */}
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Oops! Something went wrong
              </h3>
              <p className="text-sm text-gray-600">
                {error.message ||
                  'An unexpected error occurred while loading this section.'}
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={resetErrorBoundary}
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full border-red-200 bg-white px-6 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>

            {/* Additional Help Text */}
            <p className="text-xs text-gray-500">
              If the problem persists, please refresh the page or try again
              later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
