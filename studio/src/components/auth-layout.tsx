import React from 'react';
import { Heart } from 'lucide-react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Heart className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-primary-foreground">
            KnotBook
          </h1>
          <p className="mt-2 text-muted-foreground">Your wedding planning assistant</p>
        </div>
        {children}
      </div>
    </div>
  );
}
