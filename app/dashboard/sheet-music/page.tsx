'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSheetMusic, mockUsers } from '@/lib/mock-data';
import { Plus, Download, Music } from 'lucide-react';

export default function SheetMusicPage() {
  const [musicLibrary, setMusicLibrary] = useState(mockSheetMusic);

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  const getUploaderName = (uploadedBy: string) => 
    mockUsers.find(u => u.id === uploadedBy)?.name || 'Unknown';

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sheet Music Library</h1>
          <p className="text-muted-foreground mt-2">Browse and manage sheet music collection</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Upload Sheet Music
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Music className="h-4 w-4" />
              Total Pieces
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{musicLibrary.length}</div>
            <p className="text-xs text-muted-foreground">In library</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Beginner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{musicLibrary.filter(m => m.difficulty === 'beginner').length}</div>
            <p className="text-xs text-muted-foreground">Level pieces</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Advanced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{musicLibrary.filter(m => m.difficulty === 'advanced').length}</div>
            <p className="text-xs text-muted-foreground">Level pieces</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Music Collection</CardTitle>
          <CardDescription>All available sheet music for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {musicLibrary.map(music => (
              <div
                key={music.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{music.title}</h3>
                    <p className="text-sm text-muted-foreground">by {music.composer}</p>
                  </div>
                  <Badge className={difficultyColors[music.difficulty]}>
                    {music.difficulty}
                  </Badge>
                </div>

                <div className="grid gap-2 text-sm mb-3 md:grid-cols-4">
                  <div>
                    <span className="text-muted-foreground">Instrument:</span>
                    <div className="font-medium">{music.instrument}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Uploaded by:</span>
                    <div className="font-medium">{getUploaderName(music.uploadedBy)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Upload date:</span>
                    <div className="font-medium">{music.uploadDate}</div>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
