import { getAllCategories } from '@/server/db/category';
import AddDestinationForm from './add-destination-form';

export default async function AddDestinationPage() {
  const categories = await getAllCategories();
  return <AddDestinationForm categories={categories} />;
}
