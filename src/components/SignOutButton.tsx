'use client';

import { Button } from '@/components/ui/button';
import { handleSignOut } from '@/server/actions/auth';

export default function SignOutButton() {
  return (
    <Button
      onClick={async () => {
        try {
          await handleSignOut();
        } catch (error) {
          console.error('Sign out error:', error);
        }
      }}
      variant="outline"
      className="w-full"
    >
      Sign out
    </Button>
  );
}
