"use client";

import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { RecommendedProducts } from '@/components/products/RecommendedProducts';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, loading } = useCart();

  // Create a string representation of cart contents for AI recommendations
  const cartContentsDescription = cartItems.map(item => `${item.name} (Category: ${item.category})`).join(', ');

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading cart...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg shadow-sm">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground mb-6">Your cart is empty.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-sm">
            <h2 className="font-headline text-2xl font-semibold mb-4">Cart Items ({cartItems.length})</h2>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
      
      {cartItems.length > 0 && (
        <RecommendedProducts 
          currentProductDescription={`User's cart contains: ${cartContentsDescription}`} 
          userHistory={cartContentsDescription}
        />
      )}
    </div>
  );
}
