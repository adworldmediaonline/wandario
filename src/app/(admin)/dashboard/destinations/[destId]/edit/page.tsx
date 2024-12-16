import { getCategories } from '@/server/db/category';
import { getDestinationById } from '@/server/db/destination';
import EditDestinationForm from './edit-destination-form';

export default async function EditDestinationPage(props: {
  params: Promise<{ destId: string }>;
}) {
  const params = await props.params;
  const [destination, categoriesData] = await Promise.all([
    getDestinationById(params.destId),
    getCategories({}),
  ]);

  return (
    <EditDestinationForm
      destId={params.destId}
      destination={destination}
      categories={categoriesData.categories}
    />
  );
}
