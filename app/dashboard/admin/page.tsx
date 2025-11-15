'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagementTable } from '@/components/user-management-table';
import { StatisticsCards } from '@/components/statistics-cards';
import { mockUsers, mockClub } from '@/lib/mock-data';
import { Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState(mockUsers);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    inactiveUsers: users.filter(u => u.status === 'inactive').length,
    roleBreakdown: {
      admin: users.filter(u => u.role === 'admin').length,
      club_leader: users.filter(u => u.role === 'club_leader').length,
      instructor: users.filter(u => u.role === 'instructor').length,
      member: users.filter(u => u.role === 'member').length,
      trainee: users.filter(u => u.role === 'trainee').length,
    },
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage users and club settings</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <StatisticsCards stats={stats} />

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="club-settings">Club Settings</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserManagementTable users={users} setUsers={setUsers} />
        </TabsContent>

        <TabsContent value="club-settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Club Information</CardTitle>
              <CardDescription>Manage club details and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Club Name</label>
                  <div className="text-lg font-semibold mt-1">{mockClub.name}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Founded Date</label>
                  <div className="text-lg font-semibold mt-1">{mockClub.foundedDate}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Members</label>
                  <div className="text-lg font-semibold mt-1">{mockClub.members}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Avg. Attendance</label>
                  <div className="text-lg font-semibold mt-1">{mockClub.averageAttendance} members</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-muted-foreground mt-2">{mockClub.description}</p>
              </div>
              <Button>Edit Club Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Distribution</CardTitle>
              <CardDescription>Overview of users by role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.roleBreakdown).map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium capitalize">{role.replace('_', ' ')}</span>
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
