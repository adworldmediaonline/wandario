import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Logo } from './logo';

const footerLinks = {
  company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Destinations', href: '/destination' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
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
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left side - About Us */}
          <div className="space-y-6">
            <Logo size="lg" />
            <p className="text-muted-foreground max-w-md">
              Wandario is your trusted companion in exploring the world's most
              captivating destinations. We curate authentic travel experiences,
              connecting adventurers with unforgettable journeys and local
              cultures.
            </p>
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
                      // rel="noopener noreferrer"
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
              Powered by{' '}
              <Link
                href="https://www.globalinnovations.co.in/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Global Innovations
              </Link>
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
