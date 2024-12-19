import { getAllBlogCategories } from '@/server/db/blog-category';
import AddBlogForm from './add-blog-form';

export default async function AddBlogPage() {
  const categories = await getAllBlogCategories();
  return <AddBlogForm categories={categories} />;
}
