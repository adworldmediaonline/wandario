import { getDestinationById } from '@/server/db/destination';
import EditDestinationForm from './edit-destination-form';

export default async function EditDestinationPage(props: {
  params: Promise<{ destId: string }>;
}) {
  const params = await props.params;
  const destination = await getDestinationById(params.destId);

  return (
    <EditDestinationForm destId={params.destId} destination={destination} />
  );
}
