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

import Destinations from './destinations';
import { IDestination } from '@/types';

export function DestinationsTable({
  destinations,
  offset,
  totalDestinations,
}: {
  destinations: IDestination[];
  offset: number;
  totalDestinations: number;
}) {
  const router = useRouter();
  const destinationsPerPage = 5;

  function prevPage() {
    const newOffset = Math.max(0, offset - destinationsPerPage);
    router.push(`/dashboard/destinations?offset=${newOffset}`, {
      scroll: false,
    });
  }

  function nextPage() {
    const newOffset = offset + destinationsPerPage;
    router.push(`/dashboard/destinations?offset=${newOffset}`, {
      scroll: false,
    });
  }

  const startCount = totalDestinations === 0 ? 0 : offset + 1;
  const endCount = Math.min(offset + destinations.length, totalDestinations);
  const hasNextPage = offset + destinationsPerPage < totalDestinations;
  const hasPrevPage = offset > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Destinations</CardTitle>
        <CardDescription>Manage your destinations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>

              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinations.map(destination => (
              <Destinations key={destination._id} destination={destination} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            {totalDestinations > 0 ? (
              <>
                Showing{' '}
                <strong>
                  {startCount}-{endCount}
                </strong>{' '}
                of <strong>{totalDestinations}</strong> destinations
              </>
            ) : (
              <span>No destinations found</span>
            )}
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={!hasPrevPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={!hasNextPage}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
