
"use client";

import type { Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { format } from 'date-fns';
import { OrderStatusVisualizer } from './OrderStatusVisualizer';
import { Badge } from '@/components/ui/badge';
import { Truck, Package, MapPin, CalendarDays, Hash } from 'lucide-react';

interface OrderDetailsDisplayProps {
  order: Order;
}

export function OrderDetailsDisplay({ order }: OrderDetailsDisplayProps) {
  return (
    <Card className="mt-8 max-w-4xl mx-auto shadow-xl">
      <CardHeader className="bg-muted/30">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <CardTitle className="font-headline text-2xl md:text-3xl">Order Details</CardTitle>
            <CardDescription className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" /> {order.id}
            </CardDescription>
          </div>
          <Badge variant={order.status === 'Delivered' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'} className="text-sm py-1 px-3 self-start sm:self-center">
            Status: {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <OrderStatusVisualizer currentStatus={order.status} />
        
        <Separator className="my-6" />

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary"/>Order Information</h3>
            <p className="text-sm"><strong>Order Date:</strong> {format(new Date(order.orderDate), 'PPP p')}</p>
            {order.estimatedDeliveryDate && (
              <p className="text-sm"><strong>Estimated Delivery:</strong> {format(new Date(order.estimatedDeliveryDate), 'PPP')}</p>
            )}
            {order.trackingNumber && (
              <p className="text-sm"><strong>Tracking Number:</strong> {order.trackingNumber}</p>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary"/>Shipping Address</h3>
            <p className="text-sm whitespace-pre-line">{order.shippingAddress}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Package className="h-5 w-5 text-primary"/>Items in this Order</h3>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-start space-x-4 p-3 border rounded-md bg-card hover:shadow-sm transition-shadow">
                <div className="relative h-20 w-20 rounded-md overflow-hidden border shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={item.dataAiHint || item.category?.toLowerCase()}
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
                </div>
                <p className="font-semibold text-md whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-6 flex justify-end">
        <div className="text-right">
            <p className="text-sm text-muted-foreground">Order Total</p>
            <p className="font-bold text-2xl text-primary">${order.totalAmount.toFixed(2)}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
