
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <div className="mb-4">
          <Link href="/track-order" className="hover:text-primary transition-colors">
            Track Your Order
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} ShopFront. All rights reserved.</p>
        <p className="mt-1">Powered by Next.js & Firebase</p>
      </div>
    </footer>
  );
}
