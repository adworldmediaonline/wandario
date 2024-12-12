import { Suspense } from 'react';
import AdminSignInPageContent from './admin-signin-page-content';

export default function AdminSignInPage() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <AdminSignInPageContent />
    </Suspense>
  );
}
