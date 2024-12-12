import { Suspense } from 'react';
import AdminSignUpPageContent from './admin-signup-page-content';

export default function AdminSignUpPage() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <AdminSignUpPageContent />
    </Suspense>
  );
}
