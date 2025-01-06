import { type Metadata } from 'next';
import { Prose } from '@/components/ui/prose';
import Link from 'next/link';
import { Shield, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wandario',
  description:
    'Learn about how we collect, use, and protect your personal information when using Wandario services.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50/80 to-white border-b">
        <div className="container py-12">
          {/* Back Button */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-6 hover:bg-white/50 -ml-2"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          {/* Title Section */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Learn how we protect and manage your personal information. Your
              privacy is our top priority.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
        </div>

        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Prose className="prose-headings:scroll-mt-20">
              <div className="space-y-12">
                {/* Information Collection */}
                <div className="p-8 rounded-2xl bg-white/50 border shadow-sm">
                  <h2 className="flex items-center gap-3 !mt-0">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                      1
                    </span>
                    Information Collection
                  </h2>
                  <p>
                    We collect your personal information like your name, email
                    ID etc. whenever you join our mailing list, drop a comment
                    on one of our reviews or use our site in any other way.
                  </p>
                </div>

                {/* Use of Information */}
                <div className="p-8 rounded-2xl bg-white/50 border shadow-sm">
                  <h2 className="flex items-center gap-3 !mt-0">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                      2
                    </span>
                    Use of Information
                  </h2>
                  <p>
                    The information provided by you to us helps us in giving you
                    a personalized experience, sending you emails from time to
                    time, refining our web page and customer service.
                  </p>
                </div>

                {/* Information Security */}
                <div className="p-8 rounded-2xl bg-white/50 border shadow-sm">
                  <h2 className="flex items-center gap-3 !mt-0">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                      3
                    </span>
                    Information Security
                  </h2>
                  <p>
                    A number of security measures are executed to keep your
                    personal information safe and sound. Unless granted
                    permission by you, we don't give away or trade with your
                    details.
                  </p>
                </div>

                {/* Cookies */}
                <div className="p-8 rounded-2xl bg-white/50 border shadow-sm">
                  <h2 className="flex items-center gap-3 !mt-0">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                      4
                    </span>
                    Cookies
                  </h2>
                  <p>
                    Cookies enhance our website and let users have a pleasant
                    time. You can reject cookies or be aware of them directed to
                    you by configuring your computers.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-16 p-8 rounded-2xl bg-gray-50 border text-center">
                <h2 className="!mt-0">Have Questions?</h2>
                <p className="mb-6">
                  If you have any questions about our Privacy Policy, please
                  don't hesitate to contact us.
                </p>
                <Button asChild size="lg" className="rounded-full">
                  <Link href="mailto:info@wandario.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </Prose>
          </div>
        </div>
      </section>
    </main>
  );
}
