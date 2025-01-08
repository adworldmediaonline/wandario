'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './button';
import { Input } from './input';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Destinations', href: '/destination' },
    // { label: 'Photography', href: '/photography' },
    // { label: 'Accommodations', href: '/accommodations' },
    // { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Legal Information', href: '/legal-information' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Affiliate disclosure', href: '/affiliate-disclosure' },
  ],
  social: [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Thank you for subscribing!', {
      description: "We'll keep you updated with the latest news.",
    });
    setEmail('');
    setIsLoading(false);
  };

  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left side - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Stay updated with travel tips, destination guides, and exclusive
              offers delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="max-w-sm"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="ml-2 hidden sm:inline">Subscribe</span>
              </Button>
            </form>
          </div>

          {/* Right side - Links */}
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm text-muted-foreground transition-colors',
                        'hover:text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm text-muted-foreground transition-colors',
                        'hover:text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Social</h4>
              <ul className="space-y-2">
                {footerLinks.social.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm text-muted-foreground transition-colors',
                        'hover:text-foreground'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Wandario. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
