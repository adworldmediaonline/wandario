import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  container?: boolean;
}

export function Section({
  children,
  className,
  container = true,
  ...props
}: SectionProps) {
  return (
    <section className={cn('py-20', className)} {...props}>
      {container ? <div className="container">{children}</div> : children}
    </section>
  );
}
