import { EmptyState } from '@/components/ui/empty-state';
import { Search } from 'lucide-react';

export default function GlobalNotFound() {
  return (
    <div className="container py-20">
      <EmptyState
        icon={Search}
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        action={{
          label: 'Back to Home',
          href: '/',
        }}
      />
    </div>
  );
}
