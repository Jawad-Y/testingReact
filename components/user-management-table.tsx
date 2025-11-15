'use client';

import { useState } from 'react';
import { User, UserRole } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, Edit2, Trash2, Eye } from 'lucide-react';

interface UserManagementTableProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

const roleColors: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-800',
  club_leader: 'bg-blue-100 text-blue-800',
  instructor: 'bg-green-100 text-green-800',
  assistant_instructor: 'bg-yellow-100 text-yellow-800',
  member: 'bg-purple-100 text-purple-800',
  external_instructor: 'bg-orange-100 text-orange-800',
  trainee: 'bg-gray-100 text-gray-800',
};

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  suspended: 'bg-red-100 text-red-800',
};

export function UserManagementTable({ users, setUsers }: UserManagementTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const updateUserStatus = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="club_leader">Club Leader</option>
            <option value="instructor">Instructor</option>
            <option value="member">Member</option>
            <option value="trainee">Trainee</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-2 font-semibold">Name</th>
                <th className="text-left p-2 font-semibold">Email</th>
                <th className="text-left p-2 font-semibold">Role</th>
                <th className="text-left p-2 font-semibold">Status</th>
                <th className="text-left p-2 font-semibold">Join Date</th>
                <th className="text-right p-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">{user.name}</td>
                  <td className="p-2 text-muted-foreground">{user.email}</td>
                  <td className="p-2">
                    <Badge className={roleColors[user.role]}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Badge className={statusColors[user.status]}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-2 text-muted-foreground">{user.joinDate}</td>
                  <td className="p-2 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit2 className="h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                          className="gap-2"
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteUser(user.id)}
                          className="gap-2 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </CardContent>
    </Card>
  );
}
