'use client';

import { useParams } from 'next/navigation';

export default function SlugDynamicPage() {
  const params = useParams();
  console.log('SlugDynamicPage params: ', params);
  return (
    <div>
      <h1>SlugDynamicPage</h1>
    </div>
  );
}
