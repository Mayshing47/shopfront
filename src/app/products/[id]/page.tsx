"use client"; // This page uses client-side hooks for cart and AI recommendations

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';
import { mockProducts, getProductById } from '@/lib/mockData'; // Using mock data
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { RecommendedProducts } from '@/components/products/RecommendedProducts';
import { ArrowLeft, CheckCircle, ShoppingCart, Star, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const id = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id); // Fetch from mock data
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Handle product not found, e.g., redirect or show error
        console.error("Product not found");
      }
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to Cart!",
        description: `${quantity} x ${product.name} added.`,
        action: (
          <Button variant="outline" size="sm" onClick={() => router.push('/cart')}>
            View Cart
          </Button>
        ),
      });
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading product details...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center font-headline text-2xl text-destructive">
      <AlertTriangle className="inline-block mr-2 h-8 w-8" /> Product not found.
      <Button onClick={() => router.push('/products')} className="mt-4 block mx-auto">Back to Products</Button>
      </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square relative w-full rounded-lg overflow-hidden shadow-lg bg-card">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="contain" // Changed to contain to show full image if not square
            data-ai-hint={product.dataAiHint || product.category.toLowerCase()}
          />
        </div>
        <div>
          <h1 className="font-headline text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
          <Badge variant="secondary" className="mb-4">{product.category}</Badge>
          {product.rating && (
            <div className="flex items-center text-lg text-muted-foreground mb-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              {product.rating.toFixed(1)} 
              <span className="text-sm ml-1">({product.reviews} reviews)</span>
            </div>
          )}
          <p className="text-2xl font-semibold text-primary mb-6">${product.price.toFixed(2)}</p>
          
          <Separator className="my-6" />

          <p className="text-foreground/80 mb-6 leading-relaxed">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-headline text-lg font-semibold mb-2">Features:</h3>
              <ul className="list-none space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <Separator className="my-6" />

          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="font-medium">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock)))}
              className="w-20 rounded-md border border-input p-2 text-center"
              disabled={product.stock <= 0}
            />
             {product.stock > 0 && product.stock < 10 && (
                <p className="text-sm text-destructive">Only {product.stock} left in stock!</p>
            )}
            {product.stock <= 0 && (
                <p className="text-sm text-destructive font-semibold">Out of Stock</p>
            )}
          </div>

          <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto" disabled={product.stock <=0}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
      <RecommendedProducts currentProductDescription={product.description} currentProductId={product.id} userHistory={`Viewed ${product.name}, category ${product.category}`} />
    </div>
  );
}
