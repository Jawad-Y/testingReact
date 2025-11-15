'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Instrument } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';
import { Search, Plus, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface InstrumentInventoryProps {
  instruments: Instrument[];
  onCheckout: (instrumentId: string, userId: string) => void;
  onReturn: (instrumentId: string) => void;
}

const conditionColors: Record<string, string> = {
  excellent: 'bg-green-100 text-green-800',
  good: 'bg-blue-100 text-blue-800',
  fair: 'bg-yellow-100 text-yellow-800',
  needs_repair: 'bg-red-100 text-red-800',
};

export function InstrumentInventory({ instruments, onCheckout, onReturn }: InstrumentInventoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>(mockUsers[0]?.id || '');

  const filteredInstruments = instruments.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserName = (userId: string) => mockUsers.find(u => u.id === userId)?.name || 'Unknown';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instrument Inventory</CardTitle>
        <CardDescription>Manage musical instruments and equipment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search instruments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredInstruments.map(instrument => (
            <div
              key={instrument.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{instrument.name}</h3>
                  <p className="text-sm text-muted-foreground">{instrument.type}</p>
                </div>
                <Badge className={conditionColors[instrument.condition]}>
                  {instrument.condition.replace('_', ' ')}
                </Badge>
              </div>

              <div className="grid gap-2 md:grid-cols-3 mb-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <div className="font-semibold">
                    {instrument.currentUser ? (
                      <span className="text-blue-600">Checked Out</span>
                    ) : (
                      <span className="text-green-600">Available</span>
                    )}
                  </div>
                </div>
                {instrument.currentUser && (
                  <>
                    <div>
                      <span className="text-muted-foreground">Checked by:</span>
                      <div className="font-semibold">{getUserName(instrument.currentUser)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Since:</span>
                      <div className="font-semibold">{instrument.checkoutDate}</div>
                    </div>
                  </>
                )}
              </div>

              {instrument.notes && (
                <div className="mb-3 p-2 bg-muted rounded text-sm">{instrument.notes}</div>
              )}

              <div className="flex gap-2">
                {!instrument.currentUser ? (
                  <>
                    <select
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border rounded-md bg-background"
                    >
                      {mockUsers.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      size="sm"
                      onClick={() => onCheckout(instrument.id, selectedUser)}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Checkout
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReturn(instrument.id)}
                    className="gap-2 flex-1"
                  >
                    <Minus className="h-4 w-4" />
                    Return
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
