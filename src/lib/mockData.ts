
import type { Product, Order, CartItem, User } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    description: 'A timeless classic white t-shirt made from 100% premium cotton. Perfect for any occasion.',
    price: 25.99,
    imageUrl: 'https://picsum.photos/seed/whitetee/600/450', // Changed to picsum.photos
    dataAiHint: 'white t-shirt',
    category: 'Apparel',
    stock: 100,
    rating: 4.5,
    reviews: 120,
    features: ['100% Cotton', 'Regular Fit', 'Crew Neck'],
  },
  {
    id: '2',
    name: 'Modern Bluetooth Speaker',
    description: 'Sleek and powerful Bluetooth speaker with rich sound and long battery life. Connects effortlessly to any device.',
    price: 79.50,
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'bluetooth speaker',
    category: 'Electronics',
    stock: 50,
    rating: 4.8,
    reviews: 250,
    features: ['Bluetooth 5.0', '12-Hour Battery', 'Water Resistant'],
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable and supportive ergonomic office chair designed for long hours of work. Adjustable height and lumbar support.',
    price: 249.00,
    imageUrl: 'https://placehold.co/800x600.png',
    dataAiHint: 'office chair',
    category: 'Furniture',
    stock: 30,
    rating: 4.6,
    reviews: 90,
    features: ['Adjustable Lumbar Support', 'Breathable Mesh', 'Smooth Casters'],
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    description: 'Durable and eco-friendly stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 19.99,
    imageUrl: 'https://placehold.co/320x240.png',
    dataAiHint: 'water bottle',
    category: 'Accessories',
    stock: 200,
    rating: 4.9,
    reviews: 300,
    features: ['Double-Walled Insulation', 'Leak-Proof Lid', 'BPA-Free'],
  },
  {
    id: '5',
    name: 'Organic Coffee Beans',
    description: 'Premium whole bean organic coffee, medium roast with notes of chocolate and caramel. Sourced sustainably.',
    price: 15.75,
    imageUrl: 'https://placehold.co/640x480.png',
    dataAiHint: 'coffee beans',
    category: 'Groceries',
    stock: 80,
    rating: 4.7,
    reviews: 150,
    features: ['USDA Organic', 'Fair Trade Certified', 'Medium Roast'],
  },
  {
    id: '6',
    name: 'Yoga Mat Pro',
    description: 'High-density, non-slip yoga mat for professionals and beginners. Eco-friendly and easy to clean.',
    price: 35.00,
    imageUrl: 'https://placehold.co/500x375.png',
    dataAiHint: 'yoga mat',
    category: 'Sports',
    stock: 120,
    rating: 4.4,
    reviews: 75,
    features: ['Non-Slip Surface', 'Eco-Friendly Material', 'Lightweight'],
  },
   {
    id: '7',
    name: 'Noise-Cancelling Headphones',
    description: 'Immerse yourself in sound with these premium noise-cancelling headphones. Crystal clear audio and plush comfort.',
    price: 199.99,
    imageUrl: 'https://placehold.co/760x570.png',
    dataAiHint: 'headphones audio',
    category: 'Electronics',
    stock: 60,
    rating: 4.9,
    reviews: 450,
    features: ['Active Noise Cancellation', '30-Hour Battery Life', 'Comfortable Earcups'],
  },
  {
    id: '8',
    name: 'Leather Wallet',
    description: 'A slim and stylish bifold wallet crafted from genuine leather. Multiple card slots and a cash compartment.',
    price: 45.00,
    imageUrl: 'https://placehold.co/480x360.png',
    dataAiHint: 'leather wallet',
    category: 'Accessories',
    stock: 90,
    rating: 4.6,
    reviews: 110,
    features: ['Genuine Leather', 'Slim Design', 'RFID Blocking'],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(p => p.category === category);
};

export const getProductsBySearchTerm = (term: string): Product[] => {
  const lowerTerm = term.toLowerCase();
  return mockProducts.filter(p => 
    p.name.toLowerCase().includes(lowerTerm) || 
    p.description.toLowerCase().includes(lowerTerm) ||
    p.category.toLowerCase().includes(lowerTerm)
  );
};

export const getRelatedProducts = (productId: string, count: number = 3): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  return mockProducts
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, count);
};

// Mock Orders
const mockUser: User = { id: 'user123', email: 'test@example.com', name: 'Test User' };

export const mockOrders: Order[] = [
  {
    id: 'ORDER-001',
    userId: mockUser.id,
    items: [
      { ...mockProducts[0], quantity: 1 },
      { ...mockProducts[2], quantity: 1 },
    ],
    totalAmount: mockProducts[0].price + mockProducts[2].price,
    orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    shippingAddress: '123 Main St, Anytown, USA 12345',
    status: 'Shipped',
    trackingNumber: 'TN123456789US',
    estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    id: 'ORDER-002',
    userId: mockUser.id,
    items: [{ ...mockProducts[1], quantity: 2 }],
    totalAmount: mockProducts[1].price * 2,
    orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    shippingAddress: '456 Oak Ave, Otherville, USA 67890',
    status: 'Processing',
    estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
  {
    id: 'ORDER-003',
    userId: 'guest789',
    items: [{ ...mockProducts[4], quantity: 1 }],
    totalAmount: mockProducts[4].price,
    orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    shippingAddress: '789 Pine Ln, Somewhere, USA 54321',
    status: 'Delivered',
    trackingNumber: 'TN987654321CA',
    estimatedDeliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Delivered yesterday
  },
    {
    id: 'ORDER-004',
    userId: mockUser.id,
    items: [
      { ...mockProducts[3], quantity: 1 },
      { ...mockProducts[5], quantity: 2 },
    ],
    totalAmount: mockProducts[3].price + (mockProducts[5].price * 2),
    orderDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    shippingAddress: '101 Future Rd, Tech City, USA 99999',
    status: 'Pending',
    estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
];

export const getOrderById = (orderId: string): Order | undefined => {
  return mockOrders.find(order => order.id.toUpperCase() === orderId.toUpperCase());
};
