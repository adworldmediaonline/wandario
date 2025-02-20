import { Metadata } from 'next';
import AddHeaderForm from './add-header-form';
import { getPages } from '@/server/db/page';

export const metadata: Metadata = {
  title: 'Add New Header - Dashboard',
  description: 'Create a new header configuration',
};

export default async function NewHeaderPage() {
  const { pages } = await getPages({});

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Header</h1>
        <p className="text-muted-foreground">
          Create a new header configuration for your website
        </p>
      </div>

      <div className="grid gap-8">
        <AddHeaderForm pages={pages} />
      </div>
    </div>
  );
}
