import { Section } from './section';
import { Button } from './button';
import Link from 'next/link';
import { ArrowRight, Map, Building2, Bus, Globe2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MotionDiv, MotionH2, MotionP } from '../framer-motion-div/motion-div';

interface InsightItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const insights: InsightItem[] = [
  {
    icon: Map,
    title: 'Destination Information',
    description:
      'Comprehensive guides about locations, attractions, and hidden gems waiting to be discovered.',
  },
  {
    icon: Building2,
    title: 'Accommodation Recommendations',
    description:
      'Curated selection of places to stay, from luxury hotels to cozy local guesthouses.',
  },
  {
    icon: Bus,
    title: 'Local Transportation Tips',
    description:
      'Navigate like a local with our detailed transportation guides and insider tips.',
  },
  {
    icon: Globe2,
    title: 'Cultural Insights and Etiquette',
    description:
      'Understanding local customs, traditions, and etiquette for respectful travel.',
  },
];

interface TravelInsightsProps {
  className?: string;
  ctaLink?: string;
  variant?: 'default' | 'alternate';
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function TravelInsights({
  className,
  ctaLink = '#',
  variant = 'default',
}: TravelInsightsProps) {
  const isAlternate = variant === 'alternate';

  return (
    <Section className={className}>
      <div className="relative px-4 py-12 md:py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="space-y-12"
          >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
              <MotionDiv variants={item}>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Globe2 className="w-4 h-4 mr-2" />
                  Travel Expertise
                </span>
              </MotionDiv>

              <MotionH2
                variants={item}
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
              >
                Travel Insights & Recommendations
              </MotionH2>

              <MotionP
                variants={item}
                className="text-base sm:text-lg text-gray-600"
              >
                Expert Advice for Your Next Adventure
              </MotionP>
            </div>

            {/* Insights Grid */}
            <MotionDiv
              variants={item}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
            >
              {insights.map(insight => (
                <MotionDiv
                  key={insight.title}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className={cn(
                    'group p-6 sm:p-8 rounded-2xl transition-all duration-300',
                    isAlternate
                      ? 'bg-white shadow-lg shadow-gray-200/50 hover:shadow-xl'
                      : 'bg-gray-50/50 hover:bg-white hover:shadow-lg'
                  )}
                >
                  <div className="space-y-3">
                    <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
                      <insight.icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">
                      {insight.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {insight.description}
                    </p>
                  </div>
                </MotionDiv>
              ))}
            </MotionDiv>

            {/* CTA */}
            <MotionDiv variants={item} className="text-center">
              <Button
                asChild
                size="lg"
                className={cn(
                  'rounded-full',
                  isAlternate && 'bg-primary hover:bg-primary/90'
                )}
              >
                <Link href={ctaLink}>
                  <span>Explore Travel Guides</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </Section>
  );
}
