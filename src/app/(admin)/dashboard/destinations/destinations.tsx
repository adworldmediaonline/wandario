import { CldImage } from 'next-cloudinary';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { IDestination } from '@/server/db/destination';
import Link from 'next/link';

export default function Destinations({
  destination,
}: {
  destination: IDestination;
}) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <CldImage
          alt="destination image"
          className="aspect-square rounded-md object-cover"
          src={destination?.thumbnail?.public_id}
          crop="fill"
          format="webp"
          height="64"
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{destination?.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {destination?.status}
        </Badge>
      </TableCell>

      <TableCell className="hidden md:table-cell">
        {new Date(destination?.createdAt).toLocaleDateString('en-IN')}
      </TableCell>
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
              <Link href={`/dashboard/destinations/${destination._id}/edit`}>
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
