import { Suspense } from 'react';
import SignUpPageContent from './signup-page-content';

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <SignUpPageContent />
    </Suspense>
  );
}
