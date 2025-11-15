'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clothing } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';
import { Search, Plus, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ClothingInventoryProps {
  clothing: Clothing[];
  onAssign: (clothingId: string, userId: string) => void;
}

const conditionColors: Record<string, string> = {
  new: 'bg-green-100 text-green-800',
  good: 'bg-blue-100 text-blue-800',
  worn: 'bg-yellow-100 text-yellow-800',
  needs_replacement: 'bg-red-100 text-red-800',
};

const getStockStatus = (quantity: number): string => {
  if (quantity > 5) return 'High Stock';
  if (quantity > 3) return 'Good Stock';
  if (quantity > 0) return 'Low Stock';
  return 'Out of Stock';
};

const getStockColor = (quantity: number): string => {
  if (quantity > 5) return 'bg-green-100 text-green-800';
  if (quantity > 3) return 'bg-blue-100 text-blue-800';
  if (quantity > 0) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

export function ClothingInventory({ clothing, onAssign }: ClothingInventoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>(mockUsers[0]?.id || '');

  const filteredClothing = clothing.filter(c =>
    c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserName = (userId: string) => mockUsers.find(u => u.id === userId)?.name || 'Unknown';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clothing Inventory</CardTitle>
        <CardDescription>Manage performance and practice clothing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clothing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredClothing.map(item => (
            <div
              key={item.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{item.type}</h3>
                  <p className="text-sm text-muted-foreground">
                    Size: {item.size} | Color: {item.color}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={conditionColors[item.condition]}>
                    {item.condition.replace('_', ' ')}
                  </Badge>
                  <Badge className={getStockColor(item.quantity)}>
                    {getStockStatus(item.quantity)}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-semibold text-lg">{item.quantity}</span>
                </div>
                {item.assignedTo && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="font-semibold">{getUserName(item.assignedTo)}</span>
                  </div>
                )}
                {item.lastIssuedDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last issued:</span>
                    <span className="font-semibold">{item.lastIssuedDate}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {item.quantity > 0 ? (
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
                      onClick={() => onAssign(item.id, selectedUser)}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Assign
                    </Button>
                  </>
                ) : (
                  <div className="w-full p-2 bg-red-50 text-red-600 rounded text-center text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
