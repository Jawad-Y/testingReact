'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AttendanceRecord, User, TrainingSession } from '@/lib/types';

interface AttendanceHistoryProps {
  attendance: AttendanceRecord[];
  users: User[];
  sessions: TrainingSession[];
}

const statusColors: Record<string, string> = {
  present: 'bg-green-100 text-green-800',
  late: 'bg-yellow-100 text-yellow-800',
  absent: 'bg-red-100 text-red-800',
  excused: 'bg-blue-100 text-blue-800',
};

export function AttendanceHistory({ attendance, users, sessions }: AttendanceHistoryProps) {
  const getUserName = (userId: string) => users.find(u => u.id === userId)?.name || 'Unknown';
  const getSessionTitle = (sessionId: string) => sessions.find(s => s.id === sessionId)?.title || 'Unknown Session';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
        <CardDescription>Records of past attendance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-2 font-semibold">Member</th>
                <th className="text-left p-2 font-semibold">Session</th>
                <th className="text-left p-2 font-semibold">Date</th>
                <th className="text-left p-2 font-semibold">Status</th>
                <th className="text-left p-2 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(record => (
                <tr key={record.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">{getUserName(record.userId)}</td>
                  <td className="p-2 text-muted-foreground">{getSessionTitle(record.sessionId)}</td>
                  <td className="p-2 text-muted-foreground">{record.date}</td>
                  <td className="p-2">
                    <Badge className={statusColors[record.status]}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="p-2 text-muted-foreground">{record.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
