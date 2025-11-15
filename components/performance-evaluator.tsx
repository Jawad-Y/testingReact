'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, TrainingSession } from '@/lib/types';
import { Star } from 'lucide-react';

interface PerformanceEvaluatorProps {
  members: User[];
  sessions: TrainingSession[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function PerformanceEvaluator({ members, sessions, onSubmit, onCancel }: PerformanceEvaluatorProps) {
  const [formData, setFormData] = useState({
    userId: members[0]?.id || '',
    sessionId: sessions[0]?.id || '',
    rating: 3,
    feedback: '',
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ userId: members[0]?.id || '', sessionId: sessions[0]?.id || '', rating: 3, feedback: '' });
  };

  const getRatingColor = (star: number, current: number) => {
    if (hoverRating && star <= hoverRating) return 'text-yellow-400';
    if (star <= current) return 'text-yellow-400';
    return 'text-gray-300';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Performance Evaluation</CardTitle>
        <CardDescription>Evaluate member performance in a training session</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold mb-1 block">Member *</label>
              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Session *</label>
              <select
                name="sessionId"
                value={formData.sessionId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {sessions.map(session => (
                  <option key={session.id} value={session.id}>
                    {session.title} - {session.date}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Performance Rating *</label>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star className={`h-8 w-8 fill-current ${getRatingColor(star, formData.rating)}`} />
                </button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {formData.rating === 1 && 'Poor'}
              {formData.rating === 2 && 'Fair'}
              {formData.rating === 3 && 'Good'}
              {formData.rating === 4 && 'Very Good'}
              {formData.rating === 5 && 'Excellent'}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">Feedback</label>
            <textarea
              name="feedback"
              placeholder="Provide detailed feedback on the member's performance..."
              value={formData.feedback}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-background min-h-24"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Evaluation
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
