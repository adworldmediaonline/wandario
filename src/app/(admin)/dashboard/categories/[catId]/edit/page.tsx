import { getCategoryById } from '@/server/db/category';
import EditCategoryForm from './edit-category-form';

export default async function EditCategoryPage(props: {
  params: Promise<{ catId: string }>;
}) {
  const params = await props.params;
  const category = await getCategoryById(params.catId);

  return <EditCategoryForm catId={params.catId} category={category} />;
}
