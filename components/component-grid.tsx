'use client';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getComponents, RegistryComponent } from '@/lib/registry';
import { useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PackageIcon } from 'lucide-react';

interface ComponentGridProps {
  selectedTags: string[];
}

export function ComponentGrid({ selectedTags }: ComponentGridProps) {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['components', selectedTags],
    queryFn: ({ pageParam = 1 }) => getComponents(pageParam, selectedTags),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    initialPageSize: 50,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error loading components</div>;
  }

  const components = data.pages.flatMap((page) => page.components);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {components.map((component: RegistryComponent) => (
        <Card
          key={component.name}
          className="p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-2 mb-3">
            <PackageIcon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">{component.name}</h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {component.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      ))}
      <div ref={ref} className="col-span-full h-10">
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  );
}