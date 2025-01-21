'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function ButtonGroup({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex rounded-md shadow-sm',
        variant === 'outline' && 'border border-input',
        size === 'sm' && 'scale-90',
        size === 'lg' && 'scale-110',
        className
      )}
      {...props}
    />
  );
}