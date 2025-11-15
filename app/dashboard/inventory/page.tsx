'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InstrumentInventory } from '@/components/instrument-inventory';
import { ClothingInventory } from '@/components/clothing-inventory';
import { mockInstruments, mockClothing } from '@/lib/mock-data';
import { Plus, Package } from 'lucide-react';

export default function InventoryPage() {
  const [instruments, setInstruments] = useState(mockInstruments);
  const [clothing, setClothing] = useState(mockClothing);

  const checkoutInstrument = (instrumentId: string, userId: string) => {
    setInstruments(instruments.map(i =>
      i.id === instrumentId
        ? { ...i, currentUser: userId, checkoutDate: new Date().toISOString().split('T')[0] }
        : i
    ));
    alert('Instrument checked out!');
  };

  const returnInstrument = (instrumentId: string) => {
    setInstruments(instruments.map(i =>
      i.id === instrumentId
        ? { ...i, currentUser: undefined, checkoutDate: undefined }
        : i
    ));
    alert('Instrument returned!');
  };

  const assignClothing = (clothingId: string, userId: string) => {
    setClothing(clothing.map(c =>
      c.id === clothingId
        ? { ...c, assignedTo: userId, lastIssuedDate: new Date().toISOString().split('T')[0] }
        : c
    ));
    alert('Clothing assigned!');
  };

  const availableInstruments = instruments.filter(i => !i.currentUser).length;
  const checkedOutInstruments = instruments.filter(i => i.currentUser).length;
  const lowStockClothing = clothing.filter(c => c.quantity < 3).length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground mt-2">Track instruments and clothing</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Instruments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{instruments.length}</div>
            <p className="text-xs text-muted-foreground">All instruments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableInstruments}</div>
            <p className="text-xs text-muted-foreground">Ready to checkout</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Checked Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{checkedOutInstruments}</div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockClothing}</div>
            <p className="text-xs text-muted-foreground">Clothing items</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="instruments" className="w-full">
        <TabsList>
          <TabsTrigger value="instruments">Instruments ({instruments.length})</TabsTrigger>
          <TabsTrigger value="clothing">Clothing ({clothing.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="instruments" className="space-y-4">
          <InstrumentInventory
            instruments={instruments}
            onCheckout={checkoutInstrument}
            onReturn={returnInstrument}
          />
        </TabsContent>

        <TabsContent value="clothing" className="space-y-4">
          <ClothingInventory clothing={clothing} onAssign={assignClothing} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
