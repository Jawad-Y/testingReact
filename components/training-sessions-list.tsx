'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrainingSession, User } from '@/lib/types';
import { Calendar, Clock, Users, Edit2, Trash2 } from 'lucide-react';

interface TrainingSessionsListProps {
  sessions: TrainingSession[];
  instructors: User[];
}

export function TrainingSessionsList({ sessions, instructors }: TrainingSessionsListProps) {
  const getInstructorName = (instructorId: string) => 
    instructors.find(i => i.id === instructorId)?.name || 'Unknown';

  return (
    <div className="grid gap-4">
      {sessions.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground py-8">No sessions found</p>
          </CardContent>
        </Card>
      ) : (
        sessions.map(session => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{session.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                </div>
                <Badge variant={session.status === 'scheduled' ? 'default' : 'secondary'}>
                  {session.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{session.time} ({session.duration} min)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Max {session.maxParticipants}</span>
                </div>
                <div className="text-sm font-semibold">
                  Instructor: {getInstructorName(session.instructorId)}
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-semibold mb-1">Topic</div>
                <div className="text-sm text-muted-foreground">{session.topic}</div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
