import { Metadata } from 'next';
import AddPageForm from './add-page-form';

export const metadata: Metadata = {
  title: 'Add New Page - Dashboard',
  description: 'Create a new page for your website',
};

export default function NewPagePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Page</h1>
        <p className="text-muted-foreground">
          Create a new page with custom content sections
        </p>
      </div>

      <div className="grid gap-8">
        <AddPageForm />
      </div>
    </div>
  );
}
