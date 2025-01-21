'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  images: { src: string; alt: string }[];
  columns?: number;
}

export function ImageGallery({
  images,
  columns = 3,
  className,
  ...props
}: ImageGalleryProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        {
          'grid-cols-1': columns === 1,
          'grid-cols-2': columns === 2,
          'grid-cols-3': columns === 3,
          'grid-cols-4': columns === 4,
        },
        className
      )}
      {...props}
    >
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg">
          <AspectRatio ratio={1}>
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  );
}