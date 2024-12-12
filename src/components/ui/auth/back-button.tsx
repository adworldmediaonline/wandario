import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function BackButton() {
  return (
    <Button
      variant="ghost"
      className="absolute left-4 top-4 md:left-8 md:top-8"
      asChild
    >
      <Link href="/">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
    </Button>
  );
}
