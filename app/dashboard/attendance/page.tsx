'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AttendanceRecorder } from '@/components/attendance-recorder';
import { AttendanceHistory } from '@/components/attendance-history';
import { AttendanceStats } from '@/components/attendance-stats';
import { mockAttendance, mockTrainingSessions, mockUsers } from '@/lib/mock-data';
import { Plus, BarChart3 } from 'lucide-react';

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(mockAttendance);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const calculateStats = () => {
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'present').length;
    const late = attendance.filter(a => a.status === 'late').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const excused = attendance.filter(a => a.status === 'excused').length;

    return {
      total,
      present,
      late,
      absent,
      excused,
      attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
    };
  };

  const stats = calculateStats();

  const handleAddAttendance = (record: { userId: string; sessionId: string; status: 'present' | 'absent' | 'late' | 'excused'; notes?: string }) => {
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...record,
    };
    setAttendance([...attendance, newRecord]);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance Tracking</h1>
          <p className="text-muted-foreground mt-2">Record and manage member attendance</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Record Attendance
        </Button>
      </div>

      <AttendanceStats stats={stats} />

      <Tabs defaultValue="record" className="w-full">
        <TabsList>
          <TabsTrigger value="record" className="gap-2">
            <Plus className="h-4 w-4" />
            Record
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="record" className="space-y-4">
          <AttendanceRecorder
            sessions={mockTrainingSessions}
            users={mockUsers}
            onAddAttendance={handleAddAttendance}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <AttendanceHistory attendance={attendance} users={mockUsers} sessions={mockTrainingSessions} />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
              <CardDescription>Detailed attendance analysis and insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Status Distribution</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Present</span>
                      <span className="font-semibold text-green-600">{stats.present}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Late</span>
                      <span className="font-semibold text-yellow-600">{stats.late}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Absent</span>
                      <span className="font-semibold text-red-600">{stats.absent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Excused</span>
                      <span className="font-semibold text-blue-600">{stats.excused}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Quick Metrics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Records</span>
                      <span className="font-semibold">{stats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attendance Rate</span>
                      <span className="font-semibold">{stats.attendanceRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completion Rate</span>
                      <span className="font-semibold">
                        {Math.round(((stats.present + stats.late) / stats.total) * 100) || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Member Attendance Rates</h3>
                <div className="space-y-2">
                  {mockUsers.map(user => {
                    const userRecords = attendance.filter(a => a.userId === user.id);
                    const userPresent = userRecords.filter(a => a.status === 'present').length;
                    const rate = userRecords.length > 0 ? Math.round((userPresent / userRecords.length) * 100) : 0;
                    return (
                      <div key={user.id} className="flex items-center justify-between text-sm p-2 hover:bg-background rounded">
                        <span>{user.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-background rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${rate}%` }} />
                          </div>
                          <span className="font-semibold w-12 text-right">{rate}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
