'use client';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './error-fallback';
import { ReactNode } from 'react';

interface ErrorBoundaryContainerProps {
  children: ReactNode;
}

export default function ErrorBoundaryContainer({
  children,
}: ErrorBoundaryContainerProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // When the user clicks "Try Again", re-execute any custom logic
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
