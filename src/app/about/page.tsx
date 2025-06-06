
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Eye } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">About ShopFront</h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Learn more about our mission, vision, and the team dedicated to bringing you the best shopping experience.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="items-center text-center">
            <Target className="h-12 w-12 text-accent mb-3" />
            <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>
              To provide a seamless and enjoyable online shopping experience by offering high-quality products, 
              innovative features, and exceptional customer service. We aim to connect people with products that
              enhance their lives.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="items-center text-center">
            <Eye className="h-12 w-12 text-accent mb-3" />
            <CardTitle className="font-headline text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>
              To be the leading e-commerce platform known for its curated selection, personalized recommendations,
              and commitment to customer satisfaction. We strive to innovate constantly and adapt to the evolving
              needs of our shoppers.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="items-center text-center">
            <Users className="h-12 w-12 text-accent mb-3" />
            <CardTitle className="font-headline text-2xl">Our Team</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>
              We are a passionate team of developers, designers, and e-commerce enthusiasts dedicated to building
              a platform that you'll love. We believe in collaboration, innovation, and putting our customers first.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="text-center py-10 bg-muted/30 rounded-lg">
        <h2 className="font-headline text-3xl font-semibold mb-4">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          ShopFront is more than just an online store; it's a community. We are constantly working to improve 
          and expand our offerings. Thank you for being a part of our story!
        </p>
      </section>
    </div>
  );
}
