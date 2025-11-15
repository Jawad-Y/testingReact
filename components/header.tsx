'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export function Header() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="border-b bg-background px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
        <p className="text-sm text-muted-foreground">Role: {user.role.replace(/_/g, ' ')}</p>
      </div>
      <Button variant="ghost" size="icon">
        <Settings className="h-5 w-5" />
      </Button>
    </header>
  );
}
