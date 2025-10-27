'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import ManualEntryCard from '../components/ManualEntryCard';
import MainLayout from '../components/MainLayout';

export default function ManualEntryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <ManualEntryCard />
      </div>
    </MainLayout>
  );
}
