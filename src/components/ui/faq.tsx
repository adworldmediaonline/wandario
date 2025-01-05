'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  items: FAQItem[];
  className?: string;
  variant?: 'default' | 'centered';
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FAQ({
  title = 'Frequently Asked Questions',
  description,
  items,
  className,
  variant = 'default',
  ...props
}: FAQProps) {
  if (!items?.length) return null;

  return (
    <section className={cn('py-16 md:py-24', className)} {...props}>
      <div className="container max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="space-y-12"
        >
          {/* Header */}
          <div
            className={cn('space-y-4', variant === 'centered' && 'text-center')}
          >
            <motion.div
              variants={item}
              className="inline-flex items-center space-x-2 text-primary"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">
                FAQ
              </span>
            </motion.div>

            <motion.h2
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
            >
              {title}
            </motion.h2>

            {description && (
              <motion.p
                variants={item}
                className="text-lg md:text-xl text-gray-600 max-w-2xl"
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* FAQ Items */}
          <motion.div variants={item}>
            <Accordion type="single" collapsible className="w-full space-y-6">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-gray-200 rounded-2xl px-6 py-4 data-[state=open]:bg-gray-50/50 transition-colors duration-200"
                >
                  <AccordionTrigger className="hover:no-underline py-2 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 [&>svg]:transition-transform">
                    <div className="flex items-center text-left">
                      <span className="text-xl font-medium text-gray-900">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div
                      className="prose prose-gray prose-sm sm:prose-base max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
