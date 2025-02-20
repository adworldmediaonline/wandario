import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPages } from '@/server/db/page';
import { PagesTable } from './pages-table';

export const metadata: Metadata = {
  title: 'Pages Management - Dashboard',
  description: 'Manage website pages and content',
};

export default async function PagesPage(props: {
  searchParams: Promise<{ q: string; offset: string; status: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const currentOffset = parseInt(searchParams.offset ?? '0', 10);
  const status = searchParams.status ?? 'all';

  const { pages, totalPages } = await getPages({
    search,
    offset: currentOffset.toString(),
  });

  // Filter pages based on status
  const filteredPages = pages.filter(page => {
    if (status === 'all') return true;
    return page.status === status;
  });

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href="/dashboard/pages/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Page
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <PagesTable
          pages={filteredPages}
          offset={currentOffset}
          totalPages={totalPages}
        />
      </TabsContent>
      <TabsContent value="published">
        <PagesTable
          pages={pages.filter(page => page.status === 'published')}
          offset={currentOffset}
          totalPages={totalPages}
        />
      </TabsContent>
      <TabsContent value="draft">
        <PagesTable
          pages={pages.filter(page => page.status === 'draft')}
          offset={currentOffset}
          totalPages={totalPages}
        />
      </TabsContent>
    </Tabs>
  );
}
