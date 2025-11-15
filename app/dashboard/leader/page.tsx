'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers, mockTrainingSessions } from '@/lib/mock-data';
import { Plus } from 'lucide-react';

export default function LeaderDashboard() {
  const members = mockUsers.filter(u => u.role !== 'admin');
  const upcomingSessions = mockTrainingSessions.filter(s => s.status === 'scheduled');

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Club Leader Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage club activities and members</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.filter(m => m.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">In the club</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Training</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Instructors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.filter(u => u.role === 'instructor').length}</div>
            <p className="text-xs text-muted-foreground">On staff</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="training">Training Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Club Members</CardTitle>
              <CardDescription>All active members in the club</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {members.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">{member.role.replace('_', ' ')}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Session
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Training Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="p-3 border rounded-lg">
                    <div className="font-semibold">{session.title}</div>
                    <div className="text-sm text-muted-foreground">{session.description}</div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{session.date} at {session.time}</span>
                      <span className="font-medium">{session.maxParticipants} slots</span>
                    </div>
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
