"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function SplashPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Primary check: if auth is ready, route accordingly
    if (!loading) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }
  }, [loading, user, router]);

  // Safety net: Force redirect to login if stuck loading for > 2000ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        router.replace('/login');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [loading, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="text-center">
        <h1 className="font-headline text-6xl font-bold tracking-tighter text-primary-foreground">
          KnotBook
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">Your wedding planning assistant</p>
        <Loader2 className="mx-auto mt-8 h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}
