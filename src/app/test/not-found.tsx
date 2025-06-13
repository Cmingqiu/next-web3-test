'use client';

import { notFound } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    setTimeout(() => {
      // notFound();
    }, 3000);
  }, []);

  return <div>not - 404</div>;
}
