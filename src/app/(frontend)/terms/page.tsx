import { type Metadata } from 'next';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/ui/legal-page-layout';

export const metadata: Metadata = {
  title: 'Wandario Terms and Conditions | User Rights and Service Policies',
  description:
    "Review Wandario's Terms and Conditions to understand the policies governing the use of our services, user rights, and obligations. Stay informed about our terms.",
  keywords: [
    'Terms and conditions',
    'Wandario service agreement',
    'User agreement',
    'Website terms of use',
    'Service terms and policies',
    'User rights and obligations',
    'Wandario terms of service and user rights',
    'Detailed service agreement for travelers',
    'Policies governing the use of Wandario services',
  ].join(', '),
  alternates: {
    canonical: '/terms',
  },
};

const tableOfContents = [
  { id: 'interpretation', title: 'Interpretation and Definitions' },
  { id: 'acknowledgment', title: 'Acknowledgment' },
  { id: 'links', title: 'Links to Other Websites' },
  { id: 'termination', title: 'Termination' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'contact', title: 'Contact Us' },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms and Conditions"
      description="Please read these terms and conditions carefully before using our service."
      lastUpdated="April 15, 2024"
      tableOfContents={tableOfContents}
    >
      {/* Interpretation */}
      <section id="interpretation">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            01
          </span>
          Interpretation and Definitions
        </h2>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>
      </section>

      {/* Acknowledgment */}
      <section id="acknowledgment">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            02
          </span>
          Acknowledgment
        </h2>
        <p>
          These are the Terms and Conditions governing the use of this Service
          and the agreement that operates between You and the Company. These
          Terms and Conditions set out the rights and obligations of all users
          regarding the use of the Service.
        </p>
      </section>

      {/* Links */}
      <section id="links">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            03
          </span>
          Links to Other Websites
        </h2>
        <p>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by the Company. The Company has no
          control over, and assumes no responsibility for, the content, privacy
          policies, or practices of any third party web sites or services.
        </p>
      </section>

      {/* Termination */}
      <section id="termination">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            04
          </span>
          Termination
        </h2>
        <p>
          We may terminate or suspend Your access immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if You breach these Terms and Conditions.
        </p>
      </section>

      {/* Governing Law */}
      <section id="governing-law">
        <h2 className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
            05
          </span>
          Governing Law
        </h2>
        <p>
          The laws of the Country, excluding its conflicts of law rules, shall
          govern this Terms and Your use of the Service.
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
        <h2>Questions About the Terms?</h2>
        <p className="mb-6 text-muted-foreground">
          If you have any questions about these Terms and Conditions, please
          don't hesitate to reach out.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-full hover:scale-105 transition-transform"
        >
          <Link href="mailto:info@wandario.com">
            <Mail className="w-4 h-4 mr-2" />
            Contact Us
          </Link>
        </Button>
      </section>
    </LegalPageLayout>
  );
}
