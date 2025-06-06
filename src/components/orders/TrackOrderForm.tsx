
"use client";

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TrackOrderFormProps {
  onSubmit: (orderId: string) => void;
  isLoading: boolean;
}

export function TrackOrderForm({ onSubmit, isLoading }: TrackOrderFormProps) {
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(orderId);
  };

  return (
    <Card className="max-w-xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Enter Order ID</CardTitle>
        <CardDescription>Type your order confirmation number below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            placeholder="e.g., ORDER-001"
            className="flex-grow text-base"
            aria-label="Order ID"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !orderId.trim()} className="sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Track Order
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
