"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShoppingBag, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, totalPrice, totalItems, clearCart, loading: cartLoading } = useCart();
  const { currentUser, loading: authLoading } = useAuth();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed to checkout.",
        variant: "destructive",
      });
      router.push('/login?redirect=/checkout');
    }
  }, [authLoading, currentUser, router]);

  useEffect(() => {
    if (!cartLoading && totalItems === 0 && !isOrderComplete) {
        toast({
            title: "Your cart is empty",
            description: "Add some products to your cart before checking out.",
        });
        router.push('/products');
    }
  }, [cartLoading, totalItems, router, isOrderComplete]);


  const handleSimulatePurchase = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you'd save the order to a database here
    console.log("Order simulated for user:", currentUser?.email, "Items:", cartItems, "Total:", totalPrice);
    
    clearCart();
    setIsOrderComplete(true);
    toast({
      title: "Purchase Complete!",
      description: "Thank you for your order. Your items will be shipped soon.",
    });
  };

  if (cartLoading || authLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading checkout...</div>;
  }

  if (!currentUser) {
     return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h1 className="font-headline text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">You need to be logged in to view this page.</p>
            <Link href="/login?redirect=/checkout">
                <Button>Login</Button>
            </Link>
        </div>
    );
  }

  if (isOrderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
        <h1 className="font-headline text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your purchase has been successfully simulated. A confirmation email has been "sent".
        </p>
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }
  
  if (totalItems === 0) {
     return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h1 className="font-headline text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">Please add items to your cart before proceeding to checkout.</p>
            <Link href="/products">
                <Button>Browse Products</Button>
            </Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Checkout</h1>
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Order Review</CardTitle>
            <CardDescription>Please review your items before completing the purchase.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name} (x{item.quantity})</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-xl mb-2">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Shipping: Free</p>
            <p className="text-sm text-muted-foreground mt-4">This is a simulated checkout. No real payment will be processed.</p>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleSimulatePurchase}>
              Simulate Purchase
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
