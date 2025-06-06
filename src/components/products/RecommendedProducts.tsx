"use client";

import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { getAiRecommendations } from '@/app/actions'; // Server Action
import { Skeleton } from '@/components/ui/skeleton';

interface RecommendedProductsProps {
  currentProductDescription: string;
  currentProductId?: string; // To exclude current product from recommendations if AI returns it
  userHistory?: string; // Optional user browsing history
}

export function RecommendedProducts({ currentProductDescription, currentProductId, userHistory }: RecommendedProductsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const recommendedProds = await getAiRecommendations({
          productDescription: currentProductDescription,
          userHistory: userHistory || "New user interested in similar items.", // Default history
        });
        // Filter out the current product if it's in recommendations
        const filteredRecs = currentProductId 
          ? recommendedProds.filter(p => p.id !== currentProductId) 
          : recommendedProds;
        setRecommendations(filteredRecs.slice(0,3)); // Show up to 3
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations([]); // Set to empty on error
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentProductDescription, userHistory, currentProductId]);

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="font-headline text-2xl font-semibold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't render section if no recommendations
  }

  return (
    <div className="mt-12">
      <h2 className="font-headline text-2xl font-semibold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const CardSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[200px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
    <div className="flex justify-between items-center pt-2">
      <Skeleton className="h-6 w-[80px]" />
      <Skeleton className="h-10 w-[120px]" />
    </div>
  </div>
);
