"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CartSummary() {
  const { totalPrice, totalItems } = useCart();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>Free</span> {/* Or calculate shipping */}
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/checkout" className="w-full">
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={totalItems === 0}>
            Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
