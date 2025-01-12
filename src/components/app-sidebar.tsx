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
  SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/auth/admin/signin';
    },
  });

  const navItems = React.useMemo(() => {
    const items = [];

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
      items.push({
        title: 'Blog Management',
        url: '#',
        icon: Command,
        isActive: true,
        items: [
          {
            title: 'Blog Categories',
            url: '/dashboard/blogs-categories',
          },
          {
            title: 'Add New Blog Category',
            url: '/dashboard/blogs-categories/new',
          },
          {
            title: 'Blogs',
            url: '/dashboard/blogs',
          },
          {
            title: 'Add New Blog',
            url: '/dashboard/blogs/new',
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
        {status === 'loading' ? (
          <div className="space-y-2 p-2">
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
          </div>
        ) : (
          <NavMain items={navItems} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
