import { ProductList } from '@/components/products/ProductList';
import { mockProducts } from '@/lib/mockData';
// import { ProductFilter } from '@/components/products/ProductFilter'; // Placeholder for future filter component

export default function ProductsPage() {
  // In a real app, you'd fetch products, possibly with pagination and filters
  const products = mockProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold text-center">Our Products</h1>
        <p className="text-muted-foreground text-center mt-2">Browse our collection of high-quality items.</p>
      </header>
      
      {/* 
      <div className="mb-8">
        <ProductFilter />
      </div> 
      */}
      
      <ProductList products={products} />
    </div>
  );
}
