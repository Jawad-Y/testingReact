'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockClub, mockUsers, mockTrainingSessions, mockAttendance } from '@/lib/mock-data';

export default function DashboardPage() {
  const { user } = useAuth();

  const totalUsers = mockUsers.length;
  const activeSessions = mockTrainingSessions.filter(s => s.status === 'scheduled').length;
  const attendanceRate = Math.round((mockAttendance.filter(a => a.status === 'present').length / mockAttendance.length) * 100);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of {mockClub.name}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSessions}</div>
            <p className="text-xs text-muted-foreground">Scheduled trainings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">Last recorded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Club Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold">{mockClub.name}</div>
            <p className="text-xs text-muted-foreground">Since {mockClub.foundedDate.split('-')[0]}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Club Overview</CardTitle>
          <CardDescription>{mockClub.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Founded:</span>
            <span className="font-semibold">{mockClub.foundedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Members:</span>
            <span className="font-semibold">{mockClub.members}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Avg. Attendance:</span>
            <span className="font-semibold">{mockClub.averageAttendance} members</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
