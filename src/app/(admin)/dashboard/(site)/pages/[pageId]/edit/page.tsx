import { getPageById } from '@/server/db/page';
import EditPageForm from './edit-page-form';

export default async function EditPagePage(props: {
  params: Promise<{ pageId: string }>;
}) {
  const params = await props.params;
  const [page] = await Promise.all([getPageById(params.pageId)]);

  return <EditPageForm pageId={params.pageId} page={page} />;
}
