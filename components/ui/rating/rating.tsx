'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function Rating({
  value,
  max = 5,
  onChange,
  className,
  ...props
}: RatingProps) {
  return (
    <div className={cn('flex gap-1', className)} {...props}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-5 h-5 cursor-pointer',
            i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          )}
          onClick={() => onChange?.(i + 1)}
        />
      ))}
    </div>
  );
}