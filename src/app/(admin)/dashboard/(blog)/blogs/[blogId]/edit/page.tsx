import { getBlogById } from '@/server/db/blog';
import EditBlogForm from './edit-blog-form';
import { getBlogCategories } from '@/server/db/blog-category';

export default async function EditBlogPage(props: {
  params: Promise<{ blogId: string }>;
}) {
  const params = await props.params;
  const [blog, categoriesData] = await Promise.all([
    getBlogById(params.blogId),
    getBlogCategories({}),
  ]);

  return (
    <EditBlogForm
      blogId={params.blogId}
      blog={blog}
      categories={categoriesData.categories}
    />
  );
}
