import { type Metadata } from 'next';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/ui/legal-page-layout';

export const metadata: Metadata = {
  title: 'Wandario Privacy Policy | Your Data, Our Responsibility',
  description:
    'Learn how Wandario protects and manages your personal information. Our privacy policy outlines our commitment to data security and transparency.',
  keywords: [
    'Privacy policy',
    'Data protection',
    'Personal information',
    'Data security',
    'User privacy',
    'Information collection',
    'Data usage policy',
    'Privacy rights',
    'Data management',
    'Cookie policy',
  ].join(', '),
  alternates: {
    canonical: '/privacy',
  },
};

const tableOfContents = [
  { id: 'information-collection', title: 'Information Collection' },
  { id: 'use-of-information', title: 'Use of Information' },
  { id: 'information-security', title: 'Information Security' },
  { id: 'cookies', title: 'Cookies and Tracking' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'contact', title: 'Contact Us' },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="We value your privacy and are committed to protecting your personal data."
      lastUpdated="April 15, 2024"
      tableOfContents={tableOfContents}
    >
      {/* Information Collection */}
      <section id="information-collection">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            01
          </span>
          Information Collection
        </h2>
        <p>
          We collect information that you provide directly to us when using our
          services. This may include:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Name and contact information</li>
          <li>Account credentials</li>
          <li>Profile information</li>
          <li>Travel preferences and history</li>
          <li>Communication preferences</li>
        </ul>
      </section>

      {/* Use of Information */}
      <section id="use-of-information">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            02
          </span>
          Use of Information
        </h2>
        <p>
          We use the collected information to provide, maintain, and improve our
          services. This includes:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Personalizing your experience</li>
          <li>Processing your transactions</li>
          <li>Communicating with you about our services</li>
          <li>Analyzing usage patterns to improve our platform</li>
          <li>Protecting against fraudulent or unauthorized activity</li>
        </ul>
      </section>

      {/* Information Security */}
      <section id="information-security">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            03
          </span>
          Information Security
        </h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. These measures include:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments</li>
          <li>Access controls and authentication</li>
          <li>Secure data storage practices</li>
        </ul>
      </section>

      {/* Cookies */}
      <section id="cookies">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            04
          </span>
          Cookies and Tracking
        </h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience on our platform. For detailed information about our use of
          cookies, please visit our{' '}
          <Link href="/cookies" className="text-primary hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
      </section>

      {/* Third-Party Services */}
      <section id="third-party">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            05
          </span>
          Third-Party Services
        </h2>
        <p>
          Our service may include links to third-party websites and services. We
          are not responsible for the privacy practices or content of these
          third-party services. We encourage you to review their privacy
          policies before providing any personal information.
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
        <h2>Privacy Concerns?</h2>
        <p className="mb-6 text-muted-foreground">
          If you have any questions about our Privacy Policy or how we handle
          your data, please contact us.
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
