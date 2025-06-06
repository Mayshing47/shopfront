
"use client";

import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogIn, LogOut, PackageSearch, Users, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { totalItems, loading: cartLoading } = useCart();
  const { currentUser, logout, loading: authLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <PackageSearch className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl">ShopFront</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          <Link href="/products" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            Products
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {!cartLoading && totalItems > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          {!authLoading && currentUser ? (
            <>
              <span className="text-sm font-medium hidden sm:inline">Hi, {currentUser.name || currentUser.email.split('@')[0]}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="ghost" size="sm">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
