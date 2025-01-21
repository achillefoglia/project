import { Suspense } from 'react';
import ComponentRegistry from '@/components/component-registry';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentRegistry />
    </Suspense>
  );
}