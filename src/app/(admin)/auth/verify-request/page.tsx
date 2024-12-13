import { Suspense } from 'react';
import VerifyRequestPageContent from './verify-request-page-content';

export default function VerifyRequestPage() {
  return (
    <>
      <Suspense fallback={<div>Loading... </div>}>
        <VerifyRequestPageContent />
      </Suspense>
    </>
  );
}
