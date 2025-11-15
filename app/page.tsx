'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockUsers } from '@/lib/mock-data';

export default function LoginPage() {
  const { login, isLoading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (user) {
    return <div className="flex h-screen items-center justify-center"><p>Redirecting...</p></div>;
  }

  const handleLogin = async (userEmail: string) => {
    setError('');
    try {
      await login(userEmail, 'demo');
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Music Club Management System</CardTitle>
          <CardDescription>Demo Login - Select a user to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Quick Demo Users</Label>
            <div className="grid gap-2">
              {mockUsers.map((demoUser) => (
                <Button
                  key={demoUser.id}
                  onClick={() => handleLogin(demoUser.email)}
                  disabled={isLoading}
                  variant="outline"
                  className="justify-start h-auto py-3"
                >
                  <div className="text-left">
                    <div className="font-semibold">{demoUser.name}</div>
                    <div className="text-xs text-muted-foreground">{demoUser.role.replace('_', ' ')}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or email</span>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={() => handleLogin(email)}
              disabled={isLoading || !email}
              className="w-full"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
