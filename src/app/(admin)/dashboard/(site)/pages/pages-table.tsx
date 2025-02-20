'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { IPage } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface PagesTableProps {
  pages: IPage[];
  offset: number;
  totalPages: number;
}

export function PagesTable({ pages, offset, totalPages }: PagesTableProps) {
  const router = useRouter();
  const itemsPerPage = 10;
  const startCount = offset + 1;
  const endCount = Math.min(offset + itemsPerPage, totalPages);

  function prevPage() {
    if (offset >= itemsPerPage) {
      router.push(`/dashboard/pages?offset=${offset - itemsPerPage}`);
    }
  }

  function nextPage() {
    if (offset + itemsPerPage < totalPages) {
      router.push(`/dashboard/pages?offset=${offset + itemsPerPage}`);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Pages</h2>
            <p className="text-sm text-muted-foreground">
              Manage your website pages and content
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map(page => (
              <TableRow key={page._id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{page.title}</span>
                    <span className="text-sm text-muted-foreground">
                      /{page.slug}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      page.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {page.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(page.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                {/* <TableCell>
                  <PageActions page={page} />
                </TableCell> */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/pages/${page._id}/edit`}>
                          Edit
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            {totalPages > 0 ? (
              <>
                Showing{' '}
                <strong>
                  {startCount}-{endCount}
                </strong>{' '}
                of <strong>{totalPages}</strong> pages
              </>
            ) : (
              <span>No pages found</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={offset < itemsPerPage}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={offset + itemsPerPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
