import { type Metadata } from 'next';
import { Prose } from '@/components/ui/prose';
import Link from 'next/link';
import { FileText, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Wandario',
  description:
    'Read our terms and conditions to understand the rules and guidelines for using Wandario services.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50/80 to-white border-b">
        <div className="container py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">
              Terms and Conditions
            </span>
          </nav>

          {/* Title Section */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transform transition-transform hover:scale-110">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Terms and Conditions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Please read these terms and conditions carefully before using our
              service.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Prose className="prose-headings:scroll-mt-20">
              <div className="space-y-8">
                {/* Terms Sections */}
                <div className="p-8 rounded-2xl bg-white/50 border shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="!mt-0 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
                      01
                    </span>
                    Interpretation and Definitions
                  </h2>
                  <p>
                    The words of which the initial letter is capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-white/50 border shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="!mt-0 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
                      02
                    </span>
                    Acknowledgment
                  </h2>
                  <p>
                    These are the Terms and Conditions governing the use of this
                    Service and the agreement that operates between You and the
                    Company. These Terms and Conditions set out the rights and
                    obligations of all users regarding the use of the Service.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-white/50 border shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="!mt-0 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
                      03
                    </span>
                    Links to Other Websites
                  </h2>
                  <p>
                    Our Service may contain links to third-party web sites or
                    services that are not owned or controlled by the Company.
                    The Company has no control over, and assumes no
                    responsibility for, the content, privacy policies, or
                    practices of any third party web sites or services.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-white/50 border shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="!mt-0 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
                      04
                    </span>
                    Termination
                  </h2>
                  <p>
                    We may terminate or suspend Your access immediately, without
                    prior notice or liability, for any reason whatsoever,
                    including without limitation if You breach these Terms and
                    Conditions.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-white/50 border shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="!mt-0 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm">
                      05
                    </span>
                    Governing Law
                  </h2>
                  <p>
                    The laws of the Country, excluding its conflicts of law
                    rules, shall govern this Terms and Your use of the Service.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="!mt-0">Questions About the Terms?</h2>
                <p className="mb-6 text-muted-foreground">
                  If you have any questions about these Terms and Conditions,
                  please don't hesitate to reach out.
                </p>
                <Button
                  asChild
                  size="lg"
                  className=" rounded-full hover:scale-105 transition-transform"
                >
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
