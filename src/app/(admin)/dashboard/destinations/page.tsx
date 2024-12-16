import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { getDestinations } from '@/server/db/destination';
import { DestinationsTable } from './destinations-table';
import Link from 'next/link';

export default async function DestinationsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const currentOffset = parseInt(searchParams.offset ?? '0', 10);

  const { destinations, totalDestinations } = await getDestinations({
    search,
    offset: currentOffset.toString(),
  });

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href="/dashboard/destinations/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Destination
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <DestinationsTable
          destinations={destinations}
          offset={currentOffset}
          totalDestinations={totalDestinations}
        />
      </TabsContent>
    </Tabs>
  );
}
