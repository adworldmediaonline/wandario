import { Suspense } from 'react';
import SignInPageContent from './signin-page-content';

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <SignInPageContent />
    </Suspense>
  );
}
