'use client';

import { ComponentGrid } from '@/components/component-grid';
import { TagFilter } from '@/components/tag-filter';
import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllTags } from '@/lib/registry';

export default function ComponentRegistry() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tags = searchParams.get('tags')?.split(',').filter(Boolean).map(tag => tag.replace(/\+/g, ' ')) || [];

  const updateTags = useCallback(
    (newTags: string[]) => {
      if (newTags.length > 0) {
        const formattedTags = newTags.map(tag => tag.replace(/\s+/g, '+')).join(',');
        router.push(`/?tags=${formattedTags}`);
      } else {
        router.push('/');
      }
    },
    [router]
  );

  // Validate URL params on mount
  useEffect(() => {
    const validTags = getAllTags();
    const validatedTags = tags.filter(tag => validTags.includes(tag));
    
    if (validatedTags.length !== tags.length) {
      updateTags(validatedTags);
    }
  }, [tags, updateTags]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-shrink-0">
        <TagFilter selectedTags={tags} onTagChange={updateTags} />
      </aside>
      <main className="flex-1">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Component Registry</h1>
          <ComponentGrid selectedTags={tags} />
        </div>
      </main>
    </div>
  );
}