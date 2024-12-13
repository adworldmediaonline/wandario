'use client';

import * as React from 'react';
import { Command } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const navItems = React.useMemo(() => {
    const items = [];

    // Add role-specific items
    if (session?.user?.role === 'admin') {
      items.push({
        title: 'Categories Management',
        url: '#',
        icon: Command,
        isActive: true,
        items: [
          {
            title: 'Categories',
            url: '/dashboard/categories',
          },
          {
            title: 'Add New Category',
            url: '/dashboard/categories/new',
          },
        ],
      });
      items.push({
        title: 'Destination Management',
        url: '#',
        icon: Command,
        isActive: true,
        items: [
          {
            title: 'Destinations',
            url: '/dashboard/destinations',
          },
          {
            title: 'Add New Destination',
            url: '/dashboard/destinations/new',
          },
        ],
      });
    }

    return items;
  }, [session?.user?.role]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Wandario</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
