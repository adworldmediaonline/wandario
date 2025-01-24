'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useBeforeUnload } from '@/hooks/use-before-unload';

interface UnsavedChangesWarningProps {
  isDirty?: boolean;
  children: React.ReactNode;
}

export function UnsavedChangesWarning({
  isDirty,
  children,
}: UnsavedChangesWarningProps) {
  const pathname = usePathname();
  useBeforeUnload(isDirty || false);

  useEffect(() => {
    const unloadCallback = (e: PopStateEvent) => {
      if (
        isDirty &&
        !window.confirm('You have unsaved changes. Do you want to leave?')
      ) {
        window.history.pushState(null, '', pathname);
        e.preventDefault();
      }
    };

    window.addEventListener('popstate', unloadCallback);
    return () => window.removeEventListener('popstate', unloadCallback);
  }, [isDirty, pathname]);

  return <>{children}</>;
}
