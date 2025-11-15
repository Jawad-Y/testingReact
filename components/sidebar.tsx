'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Users, Calendar, Music, Package, BarChart3, Settings, LogOut, Home } from 'lucide-react';
import { canAccessPage } from '@/lib/permissions';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  requiredPage: string;
}

export function Sidebar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const navItems: NavItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: <Home className="h-4 w-4" />, requiredPage: 'dashboard' },
    { href: '/dashboard/users', label: 'Users', icon: <Users className="h-4 w-4" />, requiredPage: 'users' },
    { href: '/dashboard/attendance', label: 'Attendance', icon: <BarChart3 className="h-4 w-4" />, requiredPage: 'attendance' },
    { href: '/dashboard/training', label: 'Training', icon: <Calendar className="h-4 w-4" />, requiredPage: 'training' },
    { href: '/dashboard/performance', label: 'Performance', icon: <Music className="h-4 w-4" />, requiredPage: 'performance' },
    { href: '/dashboard/inventory', label: 'Inventory', icon: <Package className="h-4 w-4" />, requiredPage: 'inventory' },
    { href: '/dashboard/sheet-music', label: 'Sheet Music', icon: <Music className="h-4 w-4" />, requiredPage: 'sheet-music' },
  ];

  const visibleItems = navItems.filter(item => canAccessPage(user.role, item.requiredPage));

  return (
    <div className="w-64 border-r bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="border-b p-6">
        <h1 className="font-bold text-lg">Music Club</h1>
        <p className="text-sm text-sidebar-foreground/60">{user.role.replace('_', ' ')}</p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {visibleItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent" asChild>
              <span>
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="border-t p-4 space-y-2">
        <Card className="p-3 bg-sidebar-accent/10">
          <div className="text-sm font-semibold">{user.name}</div>
          <div className="text-xs text-sidebar-foreground/60">{user.email}</div>
        </Card>
        <Button onClick={logout} variant="outline" className="w-full justify-start">
          <LogOut className="h-4 w-4" />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
}
