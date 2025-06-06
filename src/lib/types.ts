
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating?: number; // Optional
  reviews?: number; // Optional
  features?: string[]; // Optional
  dataAiHint?: string; // For placeholder image search
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id:string;
  email: string;
  name?: string;
  // Add other user-specific fields if needed
}

export interface Order {
  id: string;
  userId: string; // Can be linked to a user or be a guest identifier
  items: CartItem[];
  totalAmount: number;
  orderDate: Date;
  shippingAddress: string; // Simplified
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string; // Optional tracking number
  estimatedDeliveryDate?: Date; // Optional estimated delivery date
}
