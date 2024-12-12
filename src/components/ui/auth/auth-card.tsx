import { cn } from '@/lib/utils';
import { BackButton } from './back-button';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBackButton?: boolean;
}

export function AuthCard({
  children,
  className,
  maxWidth = 'md',
  showBackButton = true,
}: AuthCardProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
      {showBackButton && <BackButton />}
      <div
        className={cn(
          'w-full space-y-6 rounded-xl border bg-card p-8 shadow-lg transition-all',
          {
            'max-w-sm': maxWidth === 'sm',
            'max-w-md': maxWidth === 'md',
            'max-w-lg': maxWidth === 'lg',
            'max-w-xl': maxWidth === 'xl',
            'max-w-2xl': maxWidth === '2xl',
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
