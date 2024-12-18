'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FormLabel } from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

interface FormLabelInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
  className?: string;
}

export function FormLabelInfo({
  label,
  required = false,
  optional = false,
  tooltip,
  className,
  ...props
}: FormLabelInfoProps) {
  return (
    <div className={cn('flex items-center gap-2 group', className)} {...props}>
      <FormLabel className="flex items-center gap-2 text-foreground/90 font-medium">
        {label}
        {required && (
          <span className="text-red-500 dark:text-red-400 text-sm font-semibold animate-pulse">
            *
          </span>
        )}
        {optional && (
          <span className="text-muted-foreground/70 text-xs font-normal bg-muted/50 px-2 py-0.5 rounded-full">
            Optional
          </span>
        )}
      </FormLabel>
      {tooltip && (
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <InfoIcon className="h-4 w-4 text-muted-foreground/60 hover:text-primary/80 transition-all duration-200 cursor-help group-hover:scale-105" />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="max-w-[220px] text-sm bg-popover/95 backdrop-blur-sm border-primary/20"
            sideOffset={4}
          >
            <p className="text-foreground/90 leading-relaxed">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
