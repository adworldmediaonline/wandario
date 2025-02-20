'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Headers from './headers';
import { IHeader } from '@/types';

interface HeadersTableProps {
  headers: IHeader[];
  offset: number;
  totalHeaders: number;
}

export function HeadersTable({
  headers,
  offset,
  totalHeaders,
}: HeadersTableProps) {
  const router = useRouter();
  const itemsPerPage = 10;

  function prevPage() {
    const prev = Math.max(0, offset - itemsPerPage);
    router.push(`/dashboard/header?offset=${prev}`);
  }

  function nextPage() {
    const next = offset + itemsPerPage;
    if (next < totalHeaders) {
      router.push(`/dashboard/header?offset=${next}`);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Headers</CardTitle>
        <CardDescription>
          A list of all headers in your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Last Updated
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {headers.map(header => (
              <Headers key={header._id} header={header} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {totalHeaders > itemsPerPage && (
        <CardFooter className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={offset === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Showing {offset + 1} to{' '}
            {Math.min(offset + itemsPerPage, totalHeaders)} of {totalHeaders}{' '}
            entries
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={offset + itemsPerPage >= totalHeaders}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
