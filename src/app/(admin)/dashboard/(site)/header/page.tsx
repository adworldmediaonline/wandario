import { Metadata } from 'next';
import { Header } from '@/server/models';
import { connectToDatabase } from '@/server/mongoose';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeadersTable } from './headers-table';

export const metadata: Metadata = {
  title: 'Header Management - Dashboard',
  description:
    'Manage website header, navigation menu, and call-to-action button',
};

export default async function HeaderPage(props: {
  searchParams: Promise<{ q: string; offset: string; status: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentOffset = parseInt(searchParams.offset ?? '0', 10);
  const status = searchParams.status ?? 'all';

  await connectToDatabase();
  const headers = await Header.find().sort({ updatedAt: -1 });
  const totalHeaders = headers.length;

  // Filter headers based on status
  const filteredHeaders = headers.filter(header => {
    if (status === 'all') return true;
    return header.status === status;
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
            <Link href="/dashboard/header/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Header
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <HeadersTable
          headers={JSON.parse(JSON.stringify(filteredHeaders))}
          offset={currentOffset}
          totalHeaders={totalHeaders}
        />
      </TabsContent>
      <TabsContent value="published">
        <HeadersTable
          headers={JSON.parse(
            JSON.stringify(
              headers.filter(header => header.status === 'published')
            )
          )}
          offset={currentOffset}
          totalHeaders={totalHeaders}
        />
      </TabsContent>
      <TabsContent value="draft">
        <HeadersTable
          headers={JSON.parse(
            JSON.stringify(headers.filter(header => header.status === 'draft'))
          )}
          offset={currentOffset}
          totalHeaders={totalHeaders}
        />
      </TabsContent>
    </Tabs>
  );
}
