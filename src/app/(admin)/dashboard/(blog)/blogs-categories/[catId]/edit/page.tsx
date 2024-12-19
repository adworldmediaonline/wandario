import { getBlogCategoryById } from '@/server/db/blog-category';
import EditCategoryForm from './edit-category-form';

export default async function EditCategoryPage(props: {
  params: Promise<{ catId: string }>;
}) {
  const params = await props.params;
  const category = await getBlogCategoryById(params.catId);
  console.log('category', category);
  return <EditCategoryForm catId={params.catId} category={category} />;
}
