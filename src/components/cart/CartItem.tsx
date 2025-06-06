"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { CartItem as CartItemType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { QuantitySelector } from './QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-start space-x-4 py-4 border-b last:border-b-0">
      <div className="relative h-24 w-24 rounded-md overflow-hidden border bg-card shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={item.dataAiHint || item.category.toLowerCase()}
        />
      </div>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`} className="hover:text-primary">
          <h3 className="font-medium font-headline text-lg">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{item.category}</p>
        <p className="text-sm font-semibold mt-1 text-primary">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end space-y-2 ml-auto shrink-0">
        <QuantitySelector
          quantity={item.quantity}
          maxQuantity={item.stock}
          onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
        />
        <p className="font-semibold text-md">${(item.price * item.quantity).toFixed(2)}</p>
        <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
          <X className="h-4 w-4 mr-1" /> Remove
        </Button>
      </div>
    </div>
  );
}
