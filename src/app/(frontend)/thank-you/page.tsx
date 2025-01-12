import { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Home, Phone, MapPin } from 'lucide-react';
import { MotionDiv } from '@/components/framer-motion-div/motion-div';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Thank You for Contacting Us | Wandario',
  description: 'Thank you for reaching out to Wandario.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default async function ThankYouPage() {
  // Check if the user came from the contact page
  const headersList = await headers();
  const referer = headersList.get('referer') || '';
  const isFromContactPage = referer.includes('/contact');

  // If not from contact page, redirect to contact page
  if (!isFromContactPage) {
    redirect('/contact');
  }

  return (
    <>
      <Section className="min-h-[80vh] flex items-center">
        <div className="container">
          <MotionDiv
            initial="hidden"
            animate="show"
            variants={container}
            className="max-w-3xl mx-auto text-center space-y-12"
          >
            {/* Success Icon */}
            <MotionDiv variants={item}>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
            </MotionDiv>

            {/* Main Content */}
            <MotionDiv variants={item} className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                Thank You for Reaching Out!
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We've received your message and appreciate you taking the time
                to contact us. Our team will review your inquiry and get back to
                you within 24 hours.
              </p>
            </MotionDiv>

            {/* What to Expect */}
            <MotionDiv variants={item}>
              <div className="bg-white rounded-2xl border p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  What to Expect
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-gray-50/50 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Phone className="w-6 h-6 text-primary" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Response Time
                    </h3>
                    <p className="text-gray-600">
                      We typically respond within 24 hours during business days
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-gray-50/50 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <MapPin
                        className="w-6 h-6 text-primary"
                        strokeWidth={2}
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Meanwhile
                    </h3>
                    <p className="text-gray-600">
                      Explore our curated travel guides and destinations
                    </p>
                  </div>
                </div>
              </div>
            </MotionDiv>

            {/* Action Buttons */}
            <MotionDiv
              variants={item}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full min-w-[160px] gap-2"
              >
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Return Home
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full min-w-[160px] gap-2"
              >
                <Link href="/destination">
                  Explore Destinations
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </MotionDiv>
          </MotionDiv>
        </div>
      </Section>
    </>
  );
}
