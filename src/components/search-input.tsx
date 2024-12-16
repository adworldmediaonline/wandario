'use client';

import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function SearchInput({
  placeholder,
  defaultValue = '',
  className,
}: SearchInputProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <Input
      type="search"
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={e => handleSearch(e.target.value)}
      className={cn('max-w-sm', className)}
      disabled={isPending}
    />
  );
}
