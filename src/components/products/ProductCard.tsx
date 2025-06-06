"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl h-full">
      <Link href={`/products/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative w-full overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-105"
              data-ai-hint={product.dataAiHint || product.category.toLowerCase()}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="font-headline text-lg leading-tight mb-1 hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
        {product.rating && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            {product.rating.toFixed(1)} ({product.reviews} reviews)
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} size="sm" disabled={product.stock <=0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
