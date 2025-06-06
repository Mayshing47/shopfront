
"use server";

import { productRecommendations, type ProductRecommendationsInput, type ProductRecommendationsOutput } from "@/ai/flows/product-recommendations";
import { mockProducts, getProductById as getMockProductById, getOrderById as getMockOrderById } from "@/lib/mockData";
import type { Product, Order } from "@/lib/types";

export async function getAiRecommendations(input: ProductRecommendationsInput): Promise<Product[]> {
  try {
    const result: ProductRecommendationsOutput = await productRecommendations(input);
    if (result.recommendations && result.recommendations.length > 0) {
      // For simplicity, this fetches from mockData. In a real app, you'd query your DB.
      // This also assumes recommendation names might match product names.
      // A more robust solution would involve product IDs or more specific matching.
      const recommendedProducts: Product[] = result.recommendations
        .map(name => mockProducts.find(p => p.name.toLowerCase().includes(name.toLowerCase())))
        .filter((p): p is Product => Boolean(p)) // Type guard to filter out undefined
        .slice(0, 3); // Limit to 3 recommendations
      
      // If AI gives fewer than 3, try to fill with related products by category from current product
      if (recommendedProducts.length < 3 && input.productDescription) {
          const currentProductName = input.productDescription.split(" ").slice(0,3).join(" "); // very naive way to get product name
          const currentProduct = mockProducts.find(p => p.name.toLowerCase().includes(currentProductName.toLowerCase()));
          if (currentProduct) {
            const relatedByCategory = mockProducts.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id && !recommendedProducts.find(rp => rp.id === p.id));
            recommendedProducts.push(...relatedByCategory.slice(0, 3 - recommendedProducts.length));
          }
      }
      return recommendedProducts;
    }
    return [];
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    return []; // Fallback to empty array on error
  }
}

// Example of another server action, e.g., for form submission
export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Simulate saving to a database or sending an email
  console.log("Form submitted:", { name, email, message });

  return { success: true, message: "Thank you for your message!" };
}

export async function getOrderDetailsAction(orderId: string): Promise<Order | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 750));
  const order = getMockOrderById(orderId);
  if (order) {
    // Convert Date objects to string to ensure serializability for client components
    return {
      ...order,
      orderDate: order.orderDate.toISOString(),
      estimatedDeliveryDate: order.estimatedDeliveryDate ? order.estimatedDeliveryDate.toISOString() : undefined,
    } as unknown as Order; // Cast because date types change
  }
  return null;
}
