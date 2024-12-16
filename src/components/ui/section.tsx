import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  container?: boolean;
  id?: string;
}

export function Section({
  children,
  className,
  id = '',
  container = true,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn('py-10', className)} {...props}>
      {container ? <div className="container">{children}</div> : children}
    </section>
  );
}
