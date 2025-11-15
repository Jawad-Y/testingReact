'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceEvaluator } from '@/components/performance-evaluator';
import { PerformanceHistory } from '@/components/performance-history';
import { mockUsers, mockTrainingSessions } from '@/lib/mock-data';
import { Plus, Star } from 'lucide-react';

export default function PerformancePage() {
  const [performances, setPerformances] = useState<any[]>([]);
  const [showEvaluator, setShowEvaluator] = useState(false);

  const handleAddPerformance = (performanceData: any) => {
    const newPerformance = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...performanceData,
    };
    setPerformances([...performances, newPerformance]);
    setShowEvaluator(false);
    alert('Performance evaluation recorded!');
  };

  const averageRating = performances.length > 0
    ? (performances.reduce((sum, p) => sum + p.rating, 0) / performances.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Evaluation</h1>
          <p className="text-muted-foreground mt-2">Track and evaluate member performance</p>
        </div>
        <Button onClick={() => setShowEvaluator(!showEvaluator)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Evaluation
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              Total Evaluations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performances.length}</div>
            <p className="text-xs text-muted-foreground">Recorded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}/5</div>
            <p className="text-xs text-muted-foreground">Across all evaluations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Members Evaluated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(performances.map(p => p.userId)).size}</div>
            <p className="text-xs text-muted-foreground">Unique members</p>
          </CardContent>
        </Card>
      </div>

      {showEvaluator && (
        <PerformanceEvaluator
          members={mockUsers.filter(u => u.role === 'member' || u.role === 'trainee')}
          sessions={mockTrainingSessions}
          onSubmit={handleAddPerformance}
          onCancel={() => setShowEvaluator(false)}
        />
      )}

      <Tabs defaultValue="evaluations" className="w-full">
        <TabsList>
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="evaluations">
          <PerformanceHistory performances={performances} users={mockUsers} sessions={mockTrainingSessions} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>Analysis of member performance trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockUsers.filter(u => u.role === 'member' || u.role === 'trainee').map(member => {
                const memberPerformances = performances.filter(p => p.userId === member.id);
                const avgRating = memberPerformances.length > 0
                  ? (memberPerformances.reduce((sum, p) => sum + p.rating, 0) / memberPerformances.length).toFixed(1)
                  : 'N/A';

                return (
                  <div key={member.id} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-500">
                          {avgRating === 'N/A' ? '-' : avgRating}
                        </div>
                        <div className="text-xs text-muted-foreground">{memberPerformances.length} evaluations</div>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${(Number(avgRating) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
