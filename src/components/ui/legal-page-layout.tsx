'use client';

import { motion } from 'framer-motion';
import { Section } from './section';
import { Prose } from './prose';
import { cn } from '@/lib/utils';
import { ScrollArea } from './scroll-area';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  lastUpdated?: string;
  children: React.ReactNode;
  className?: string;
  tableOfContents?: {
    id: string;
    title: string;
  }[];
}

export function LegalPageLayout({
  title,
  description,
  lastUpdated,
  children,
  className,
  tableOfContents,
}: LegalPageLayoutProps) {
  return (
    <>
      {/* Header */}
      <Section className="bg-gray-50/50 border-b">
        <div className="container py-5 md:py-5">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center space-x-2 text-sm text-gray-600"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900">{title}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-4"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              {title}
            </h1>
            <p className="text-lg text-gray-600">{description}</p>
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated}
              </p>
            )}
          </motion.div>
        </div>
      </Section>

      {/* Content */}
      <Section className={cn('py-12 md:py-16', className)}>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <Prose>{children}</Prose>
            </motion.div>

            {/* Table of Contents Sidebar */}
            {tableOfContents && tableOfContents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:w-72 xl:w-80"
              >
                <div className="sticky top-20">
                  <div className="rounded-xl border bg-card p-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Table of Contents
                    </h2>
                    <ScrollArea className="h-[calc(100vh-16rem)]">
                      <nav className="space-y-2">
                        {tableOfContents.map(item => (
                          <Link
                            key={item.id}
                            href={`#${item.id}`}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors py-1"
                          >
                            <ChevronRight className="h-3 w-3" />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </nav>
                    </ScrollArea>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
