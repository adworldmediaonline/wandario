import EditHeaderForm from './edit-header-form';
import { Metadata } from 'next';
import { getPages } from '@/server/db/page';
import { getHeaderById } from '@/server/db/header';

export const metadata: Metadata = {
  title: 'Edit Header - Dashboard',
  description: 'Edit website header configuration',
};

export default async function EditHeaderPage(props: {
  params: Promise<{ headerId: string }>;
}) {
  const params = await props.params;

  const { pages } = await getPages({});
  const header = await getHeaderById(params.headerId);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Header</h1>
        <p className="text-muted-foreground">
          Modify your website header configuration
        </p>
      </div>

      <div className="grid gap-8">
        <EditHeaderForm
          header={header}
          headerId={params.headerId}
          pages={pages}
        />
      </div>
    </div>
  );
}
