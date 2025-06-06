
"use client";

import { useState } from 'react';
import { TrackOrderForm } from '@/components/orders/TrackOrderForm';
import { OrderDetailsDisplay } from '@/components/orders/OrderDetailsDisplay';
import type { Order } from '@/lib/types';
import { getOrderDetailsAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Helper to parse order dates that might be strings
const parseOrderDates = (order: any): Order => {
  return {
    ...order,
    orderDate: new Date(order.orderDate),
    estimatedDeliveryDate: order.estimatedDeliveryDate ? new Date(order.estimatedDeliveryDate) : undefined,
  };
};


export default function TrackOrderPage() {
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrackOrder = async (orderId: string) => {
    if (!orderId.trim()) {
      setError("Please enter an Order ID.");
      setOrderDetails(null);
      setSearched(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    setOrderDetails(null);
    setSearched(true);

    try {
      const result = await getOrderDetailsAction(orderId);
      if (result) {
        setOrderDetails(parseOrderDates(result));
      } else {
        setError(`Order ID "${orderId}" not found. Please check the ID and try again.`);
      }
    } catch (err) {
      console.error("Failed to fetch order details:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">Track Your Order</h1>
        <p className="text-muted-foreground mt-2 text-lg">Enter your Order ID to see its current status and details.</p>
      </header>

      <TrackOrderForm onSubmit={handleTrackOrder} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-8 max-w-2xl mx-auto">
            <Skeleton className="h-10 w-1/3 mb-4" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-24 w-full" />
        </div>
      )}

      {error && !isLoading && (
        <Alert variant="destructive" className="mt-8 max-w-xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && orderDetails && (
        <OrderDetailsDisplay order={orderDetails} />
      )}

      {!isLoading && !error && !orderDetails && searched && (
         <Alert className="mt-8 max-w-xl mx-auto border-blue-500 text-blue-700">
          <Info className="h-4 w-4 !text-blue-700" />
          <AlertTitle className="text-blue-800">No Order Found</AlertTitle>
          <AlertDescription className="text-blue-600">
            We couldn't find an order with the ID you entered. Please verify the Order ID and try again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
