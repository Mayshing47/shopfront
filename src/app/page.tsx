
import { ProductList } from '@/components/products/ProductList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts } from '@/lib/mockData';
import { ArrowRight, Lightbulb, Rocket, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4); // Show first 4 products as featured

  const whyShopWithUsFeatures = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary mb-3" />,
      title: "Quality Selection",
      description: "Handpicked items to ensure the best quality and value for your money.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary mb-3" />,
      title: "Smart Recommendations",
      description: "AI-powered suggestions tailored to your preferences, helping you discover what you'll love.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary mb-3" />,
      title: "Seamless Experience",
      description: "Enjoy easy browsing, secure checkout, and fast shipping for a hassle-free journey.",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-lg shadow-xl">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold mb-6">
          Welcome to ShopFront!
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Discover your next favorite items with our curated collection and smart recommendations.
        </p>
        <Link href="/products">
          <Button size="lg" className="bg-background text-accent font-semibold hover:bg-background/90 transform hover:scale-105 transition-transform">
            Explore All Products <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      <section className="py-12 md:py-16">
        <h2 className="font-headline text-3xl font-semibold mb-8 text-center">
          Featured Products
        </h2>
        <ProductList products={featuredProducts} />
      </section>

      <section className="py-12 md:py-16 bg-muted/30 rounded-lg shadow-sm">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="font-headline text-3xl font-semibold mb-10">Why Shop With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyShopWithUsFeatures.map((feature, index) => (
              <Card key={index} className="text-center bg-card hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
