'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Loader2, MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function SearchInput({ className }: { className?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function searchAction(formData: FormData) {
    const value = formData.get('q') as string;
    const params = new URLSearchParams({ q: value });
    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }

  return (
    <form
      action={searchAction}
      className={cn('relative flex items-center gap-2', className)}
    >
      <div className="relative flex-1">
        <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <div className="hidden sm:block h-4 w-[1px] bg-muted-foreground/30" />
        </div>
        <Input
          name="q"
          type="search"
          placeholder="Where to?"
          className="w-full pl-8 sm:pl-14 py-5 sm:py-6 text-sm sm:text-base bg-transparent border-none ring-1 ring-muted/30 hover:ring-muted/50 focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-shadow"
        />
      </div>

      <Button
        type="submit"
        size="icon"
        className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl bg-primary hover:bg-primary/90 transition-colors"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-white" />
        ) : (
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        )}
      </Button>
    </form>
  );
}
