'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';
import CloudinaryImage from '@/components/cloudinary-image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Breadcrumb } from './breadcrumb';

interface HeroHeaderProps {
  title: string;
  excerpt?: string;
  className?: string;
  backgroundImageId?: string;
  breadcrumb?: {
    segments: {
      title: string;
      href: string;
    }[];
  };
  actions?: {
    primary?: {
      label: string;
      href: string;
    };
    secondary?: {
      label: string;
      href: string;
    };
  };
}

const menuItems = [
  { href: '#accommodations', label: 'Accommodations' },
  { href: '#activities', label: 'Activities' },
  { href: '#photography', label: 'Photography' },
  { href: '#cuisine', label: 'Local Cuisine' },
  { href: '#resources', label: 'Resources' },
];

export default function HeroHeader({
  breadcrumb,
  title,
  excerpt,
  backgroundImageId = '/testing/hero-bg.jpg',
  className,
  actions,
}: HeroHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={cn('relative min-h-[85vh] flex flex-col', className)}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/20">
        <div className="relative w-full h-full">
          <CloudinaryImage
            src={backgroundImageId}
            alt="Background"
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center">
        <div className="container px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            {breadcrumb && (
              <div className="mb-6">
                <Breadcrumb
                  segments={breadcrumb.segments}
                  className="bg-white/10 backdrop-blur-sm"
                />
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {title}
            </h1>

            {/* Description */}
            {excerpt && (
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                {excerpt}
              </p>
            )}

            {/* Actions */}
            {actions && (
              <div className="flex flex-wrap gap-4">
                {actions.primary && (
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90"
                  >
                    <Link href={actions.primary.href}>
                      <span>{actions.primary.label}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {actions.secondary && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white text-primary hover:bg-white/10"
                  >
                    <Link href={actions.secondary.href}>
                      {actions.secondary.label}
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu className="py-4">
              <NavigationMenuList>
                {menuItems.map(item => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'bg-transparent text-white hover:bg-white/10 hover:text-white'
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden py-4 px-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {menuItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}
