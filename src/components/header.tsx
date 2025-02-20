import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
import { Logo } from '@/components/ui/logo';
import { getPrimaryHeader } from '@/server/db/header';

export default async function Header() {
  const header = await getPrimaryHeader();
  const menuItems = header?.menuItems ?? [];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems?.map(item => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'capitalize bg-transparent hover:bg-accent/50'
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

        <div className="flex items-center gap-4">
          {/* Contact Us Button */}
          {header?.ctaButton && (
            <Button asChild size="sm" className="rounded-full hidden md:flex">
              <Link href={header?.ctaButton?.href ?? '/contact'}>
                {header?.ctaButton?.label ?? 'Contact Us'}
              </Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>
                  <Logo size="sm" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {menuItems.map(item => (
                  <SheetTrigger asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="text-lg capitalize font-medium transition-colors hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  </SheetTrigger>
                ))}

                {header?.ctaButton && (
                  <SheetTrigger asChild>
                    <Button asChild className="mt-4">
                      <Link href={header?.ctaButton?.href ?? '/contact'}>
                        {header?.ctaButton?.label ?? 'Contact Us'}
                      </Link>
                    </Button>
                  </SheetTrigger>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
