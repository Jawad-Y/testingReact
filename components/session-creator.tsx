'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@/lib/types';

interface SessionCreatorProps {
  instructors: User[];
  onCreate: (data: any) => void;
  onCancel: () => void;
}

export function SessionCreator({ instructors, onCreate, onCancel }: SessionCreatorProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructorId: instructors[0]?.id || '',
    date: '',
    time: '',
    duration: 60,
    maxParticipants: 10,
    topic: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'maxParticipants' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }
    onCreate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Training Session</CardTitle>
        <CardDescription>Schedule a new training session</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold mb-1 block">Session Title *</label>
              <Input
                name="title"
                placeholder="e.g., Violin Fundamentals"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Instructor *</label>
              <select
                name="instructorId"
                value={formData.instructorId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {instructors.map(instructor => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Date *</label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Time *</label>
              <Input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Duration (minutes)</label>
              <Input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="15"
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Max Participants</label>
              <Input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">Topic</label>
            <Input
              name="topic"
              placeholder="e.g., Instrument Technique"
              value={formData.topic}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">Description</label>
            <textarea
              name="description"
              placeholder="Describe the training session..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-background min-h-24"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Create Session
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
