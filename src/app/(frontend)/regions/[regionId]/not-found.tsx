import { EmptyState } from '@/components/ui/empty-state';
import { MapPin } from 'lucide-react';

export default function RegionNotFound() {
  return (
    <div className="container py-20">
      <EmptyState
        icon={MapPin}
        title="Region Not Found"
        description="The region you're looking for doesn't exist or has been removed."
        action={{
          label: 'View All Regions',
          href: '/regions',
        }}
      />
    </div>
  );
}
