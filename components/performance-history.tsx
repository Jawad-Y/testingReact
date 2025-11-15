'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, TrainingSession } from '@/lib/types';
import { Star } from 'lucide-react';

interface PerformanceHistoryProps {
  performances: any[];
  users: User[];
  sessions: TrainingSession[];
}

const getRatingColor = (rating: number): string => {
  if (rating >= 4) return 'text-green-600';
  if (rating >= 3) return 'text-yellow-600';
  return 'text-red-600';
};

export function PerformanceHistory({ performances, users, sessions }: PerformanceHistoryProps) {
  const getUserName = (userId: string) => users.find(u => u.id === userId)?.name || 'Unknown';
  const getSessionTitle = (sessionId: string) => sessions.find(s => s.id === sessionId)?.title || 'Unknown Session';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluation History</CardTitle>
        <CardDescription>All recorded performance evaluations</CardDescription>
      </CardHeader>
      <CardContent>
        {performances.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No evaluations recorded yet</p>
        ) : (
          <div className="space-y-3">
            {performances.map(performance => (
              <div key={performance.id} className="p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold">{getUserName(performance.userId)}</div>
                    <div className="text-sm text-muted-foreground">{getSessionTitle(performance.sessionId)}</div>
                  </div>
                  <div className="text-right">
                    <div className={`flex gap-1 mb-1 ${getRatingColor(performance.rating)}`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < performance.rating ? 'fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">{performance.date}</div>
                  </div>
                </div>
                {performance.feedback && (
                  <div className="text-sm text-muted-foreground italic">"{performance.feedback}"</div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
