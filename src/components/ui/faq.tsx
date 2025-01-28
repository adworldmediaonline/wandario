import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { MotionDiv, MotionH1, MotionH2 } from '../framer-motion-div/motion-div';

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
  h1?: string;
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
  h1 = '',
  variant = 'default',
  ...props
}: FAQProps) {
  if (!items?.length) return null;

  return (
    <section className={cn('w-full  pb-16 md:pb-24', className)} {...props}>
      <div className="container">
        <MotionDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="mx-auto max-w-4xl space-y-12"
        >
          <div
            className={cn('space-y-4', variant === 'centered' && 'text-center')}
          >
            <MotionDiv
              variants={item}
              className="inline-flex items-center space-x-2 text-primary"
            >
              <span className="text-sm font-medium uppercase tracking-wider">
                FAQ
              </span>
            </MotionDiv>

            {h1 && (
              <MotionH1
                variants={item}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sm:text-4xl md:text-5xl"
              >
                {h1}
              </MotionH1>
            )}

            {!h1 && (
              <MotionH2
                variants={item}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sm:text-4xl md:text-5xl"
              >
                {title}
              </MotionH2>
            )}
            {description && (
              <MotionH2
                variants={item}
                className="mx-auto max-w-2xl text-base text-center text-gray-600 md:text-lg"
              >
                {description}
              </MotionH2>
            )}
          </div>

          {/* FAQ Items */}
          <MotionDiv variants={item}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-gray-200 rounded-2xl px-4 py-3 data-[state=open]:bg-gray-50/50 transition-colors duration-200 sm:px-6 sm:py-4"
                >
                  <AccordionTrigger className="hover:no-underline py-2 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 [&>svg]:transition-transform">
                    <div className="flex items-center text-left">
                      <span className="text-lg font-medium text-gray-900 sm:text-xl">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-3 pb-2">
                    <div
                      className="prose prose-gray prose-sm max-w-none sm:prose-base"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
