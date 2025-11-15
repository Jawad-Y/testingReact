'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { mockUsers, mockTrainingSessions, mockSheetMusic } from '@/lib/mock-data';
import { Plus, Calendar, Upload } from 'lucide-react';

export default function InstructorDashboard() {
  const upcomingSessions = mockTrainingSessions.filter(s => s.status === 'scheduled');
  const completedSessions = mockTrainingSessions.filter(s => s.status === 'completed');

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your training sessions and materials</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSessions.length}</div>
            <p className="text-xs text-muted-foreground">Total delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sheet Music</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSheetMusic.length}</div>
            <p className="text-xs text-muted-foreground">Available materials</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="w-full">
        <TabsList>
          <TabsTrigger value="sessions">My Sessions</TabsTrigger>
          <TabsTrigger value="materials">Teaching Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Session
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingSessions.map(session => (
              <Card key={session.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">{session.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{session.date} at {session.time}</span>
                    <span>{session.duration} min</span>
                    <span>Max {session.maxParticipants} participants</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Material
          </Button>

          <div className="grid gap-3">
            {mockSheetMusic.map(music => (
              <Card key={music.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{music.title}</h3>
                      <p className="text-sm text-muted-foreground">by {music.composer}</p>
                    </div>
                    <div className="text-sm font-medium">{music.instrument} - {music.difficulty}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
