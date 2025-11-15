'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrainingSessionsList } from '@/components/training-sessions-list';
import { SessionCreator } from '@/components/session-creator';
import { mockTrainingSessions, mockUsers } from '@/lib/mock-data';
import { Plus, Calendar } from 'lucide-react';

export default function TrainingPage() {
  const [sessions, setSessions] = useState(mockTrainingSessions);
  const [showCreator, setShowCreator] = useState(false);

  const handleCreateSession = (sessionData: any) => {
    const newSession = {
      id: Date.now().toString(),
      ...sessionData,
      status: 'scheduled' as const,
    };
    setSessions([...sessions, newSession]);
    setShowCreator(false);
    alert('Training session created successfully!');
  };

  const upcomingSessions = sessions.filter(s => s.status === 'scheduled');
  const completedSessions = sessions.filter(s => s.status === 'completed');
  const instructors = mockUsers.filter(u => u.role === 'instructor' || u.role === 'external_instructor');

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Sessions</h1>
          <p className="text-muted-foreground mt-2">Schedule and manage training sessions</p>
        </div>
        <Button onClick={() => setShowCreator(!showCreator)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Session
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessions.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSessions.length}</div>
            <p className="text-xs text-muted-foreground">Finished</p>
          </CardContent>
        </Card>
      </div>

      {showCreator && (
        <SessionCreator
          instructors={instructors}
          onCreate={handleCreateSession}
          onCancel={() => setShowCreator(false)}
        />
      )}

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingSessions.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedSessions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <TrainingSessionsList sessions={upcomingSessions} instructors={instructors} />
        </TabsContent>

        <TabsContent value="completed">
          <TrainingSessionsList sessions={completedSessions} instructors={instructors} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
