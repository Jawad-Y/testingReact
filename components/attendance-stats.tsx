'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface AttendanceStatsProps {
  stats: {
    total: number;
    present: number;
    late: number;
    absent: number;
    excused: number;
    attendanceRate: number;
  };
}

export function AttendanceStats({ stats }: AttendanceStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Present
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.present}</div>
          <p className="text-xs text-muted-foreground">On time</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-600" />
            Late
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.late}</div>
          <p className="text-xs text-muted-foreground">Arrived late</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-600" />
            Absent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.absent}</div>
          <p className="text-xs text-muted-foreground">No show</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            Excused
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.excused}</div>
          <p className="text-xs text-muted-foreground">With reason</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
          <p className="text-xs text-muted-foreground">Attendance rate</p>
        </CardContent>
      </Card>
    </div>
  );
}
