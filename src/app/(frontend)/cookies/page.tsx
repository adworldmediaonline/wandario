import { type Metadata } from 'next';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/ui/legal-page-layout';

export const metadata: Metadata = {
  title: 'Cookie Policy | Wandario',
  description:
    'Learn about how Wandario uses cookies to enhance your browsing experience. Understand our cookie policy and how to manage your cookie preferences.',
  keywords: [
    'Cookie policy',
    'Cookie usage',
    'Cookie preferences',
    'Website cookies',
    'Cookie management',
    'Browser cookies',
    'Cookie settings',
    'Cookie types',
    'Cookie consent',
    'Data tracking',
  ].join(', '),
  alternates: {
    canonical: '/cookies',
  },
};

const tableOfContents = [
  { id: 'what-are-cookies', title: 'What Are Cookies?' },
  { id: 'types-of-cookies', title: 'Types of Cookies We Use' },
  { id: 'cookie-purposes', title: 'How We Use Cookies' },
  { id: 'managing-cookies', title: 'Managing Your Cookie Preferences' },
  { id: 'third-party-cookies', title: 'Third-Party Cookies' },
  { id: 'contact', title: 'Contact Us' },
];

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="Learn about how we use cookies and similar technologies on our website."
      lastUpdated="April 15, 2024"
      tableOfContents={tableOfContents}
    >
      {/* What Are Cookies */}
      <section id="what-are-cookies">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            01
          </span>
          What Are Cookies?
        </h2>
        <p>
          Cookies are small text files that are placed on your device when you
          visit our website. They help us provide you with a better experience
          by:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Remembering your preferences and settings</li>
          <li>Understanding how you use our website</li>
          <li>Improving website performance and functionality</li>
          <li>Providing personalized content and recommendations</li>
        </ul>
      </section>

      {/* Types of Cookies */}
      <section id="types-of-cookies">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            02
          </span>
          Types of Cookies We Use
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly.
              They enable basic functions like page navigation and access to
              secure areas of the website.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Performance Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our
              website by collecting and reporting information anonymously.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Functionality Cookies</h3>
            <p>
              These cookies enable the website to remember choices you make
              (such as your language preference) to provide enhanced features.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Targeting Cookies</h3>
            <p>
              These cookies may be set through our site by our advertising
              partners to build a profile of your interests and show you
              relevant ads on other sites.
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Purposes */}
      <section id="cookie-purposes">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            03
          </span>
          How We Use Cookies
        </h2>
        <p>We use cookies for various purposes, including:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Authentication and security</li>
          <li>Analyzing site traffic and user behavior</li>
          <li>Personalizing content and recommendations</li>
          <li>Improving website performance</li>
          <li>Remembering user preferences</li>
        </ul>
      </section>

      {/* Managing Cookies */}
      <section id="managing-cookies">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            04
          </span>
          Managing Your Cookie Preferences
        </h2>
        <p>
          You can control and manage cookies in various ways. Please note that
          removing or blocking cookies can impact your user experience and parts
          of our website may no longer be fully accessible.
        </p>
        <div className="mt-4 p-4 bg-primary/5 rounded-lg">
          <h3 className="font-medium mb-2">Browser Controls</h3>
          <p>
            Most browsers allow you to view, delete or block cookies from
            websites. Visit your browser's help section to learn more:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Safari</li>
            <li>Microsoft Edge</li>
          </ul>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section id="third-party-cookies">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            05
          </span>
          Third-Party Cookies
        </h2>
        <p>
          Some cookies are placed by third-party services that appear on our
          pages. We do not control the dissemination of these cookies. You
          should check the third-party websites for more information about these
          cookies.
        </p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border text-center"
      >
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <h2>Questions About Cookies?</h2>
        <p className="mb-6 text-muted-foreground">
          If you have any questions about our use of cookies or other
          technologies, please don't hesitate to contact us.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-full hover:scale-105 transition-transform"
        >
          <Link href="mailto:privacy@wandario.com">
            <Mail className="w-4 h-4 mr-2" />
            Contact Privacy Team
          </Link>
        </Button>
      </section>
    </LegalPageLayout>
  );
}
