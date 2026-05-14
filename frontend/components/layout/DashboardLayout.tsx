'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { isAuthenticated } from '@/utils/auth';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // Start as false so SSR and the initial client render agree on the same output.
  // We only read localStorage after mount (client-only).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  // Before mount: both SSR and client render this — hydration matches.
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  // After mount: unauthenticated — redirect is already in-flight.
  if (!isAuthenticated()) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-60 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
