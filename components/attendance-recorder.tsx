'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrainingSession, User } from '@/lib/types';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface AttendanceRecorderProps {
  sessions: TrainingSession[];
  users: User[];
  onAddAttendance: (record: {
    userId: string;
    sessionId: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    notes?: string;
  }) => void;
}

export function AttendanceRecorder({ sessions, users, onAddAttendance }: AttendanceRecorderProps) {
  const [selectedSession, setSelectedSession] = useState<string>(sessions[0]?.id || '');
  const [sessionAttendance, setSessionAttendance] = useState<Record<string, 'present' | 'absent' | 'late' | 'excused'>>({});

  const handleStatusChange = (userId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setSessionAttendance(prev => ({
      ...prev,
      [userId]: status,
    }));
  };

  const handleSubmit = () => {
    Object.entries(sessionAttendance).forEach(([userId, status]) => {
      onAddAttendance({
        userId,
        sessionId: selectedSession,
        status,
      });
    });
    setSessionAttendance({});
    alert('Attendance recorded successfully!');
  };

  const getStatusButton = (status: 'present' | 'absent' | 'late' | 'excused' | undefined) => {
    const baseClass = 'h-10 w-10 rounded-full transition-all';
    const isActive = sessionAttendance[users[0]?.id] === status;

    switch (status) {
      case 'present':
        return `${baseClass} ${isActive ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600 hover:bg-green-200'}`;
      case 'late':
        return `${baseClass} ${isActive ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'}`;
      case 'absent':
        return `${baseClass} ${isActive ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600 hover:bg-red-200'}`;
      case 'excused':
        return `${baseClass} ${isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`;
      default:
        return baseClass;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Attendance</CardTitle>
        <CardDescription>Mark attendance for training session participants</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-2 block">Select Session</label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background"
          >
            {sessions.map(session => (
              <option key={session.id} value={session.id}>
                {session.title} - {session.date} at {session.time}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <div className="font-semibold mb-3">Mark Members</div>
          {users.map(user => {
            const currentStatus = sessionAttendance[user.id];
            return (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`gap-1 ${sessionAttendance[user.id] === 'present' ? 'bg-green-100' : ''}`}
                    onClick={() => handleStatusChange(user.id, 'present')}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`gap-1 ${sessionAttendance[user.id] === 'late' ? 'bg-yellow-100' : ''}`}
                    onClick={() => handleStatusChange(user.id, 'late')}
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`gap-1 ${sessionAttendance[user.id] === 'absent' ? 'bg-red-100' : ''}`}
                    onClick={() => handleStatusChange(user.id, 'absent')}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`gap-1 ${sessionAttendance[user.id] === 'excused' ? 'bg-blue-100' : ''}`}
                    onClick={() => handleStatusChange(user.id, 'excused')}
                  >
                    <AlertCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <Button onClick={handleSubmit} className="w-full" disabled={Object.keys(sessionAttendance).length === 0}>
          Submit Attendance
        </Button>
      </CardContent>
    </Card>
  );
}
