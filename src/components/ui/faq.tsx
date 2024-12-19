'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQ({
  title = 'Frequently Asked Questions',
  description,
  items,
  className,
  ...props
}: FAQProps) {
  if (!items?.length) return null;

  return (
    <section className={cn('py-12', className)} {...props}>
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-serif tracking-tight">{title}</h2>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full divide-y divide-muted/20"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`faq-${index}`} className="border-0 py-6">
                  <AccordionTrigger className="hover:no-underline py-0 text-left [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-muted-foreground">
                    <span className="text-2xl font-serif tracking-tight">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-6">
                    <div
                      className="text-lg text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
