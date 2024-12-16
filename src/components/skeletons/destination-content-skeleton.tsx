import { Skeleton } from '@/components/ui/skeleton';

export default function DestinationContentSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="w-full aspect-video rounded-xl" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
