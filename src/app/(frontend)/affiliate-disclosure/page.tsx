import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/ui/legal-page-layout';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | Wandario',
  description:
    'Learn about our affiliate partnerships and how we maintain transparency in our recommendations while providing value to our users.',
  alternates: {
    canonical: '/affiliate-disclosure',
  },
};

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'disclosure', title: 'Affiliate Disclosure Statement' },
  { id: 'partnerships', title: 'Our Partnerships' },
  { id: 'compensation', title: 'Compensation Disclosure' },
  { id: 'transparency', title: 'Our Commitment to Transparency' },
  { id: 'recommendations', title: 'Product Recommendations' },
];

export default function AffiliateDisclosurePage() {
  return (
    <LegalPageLayout
      title="Affiliate Disclosure"
      description="Information about our affiliate partnerships and how we maintain transparency in our recommendations"
      lastUpdated="April 15, 2024"
      tableOfContents={tableOfContents}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          At Wandario, we believe in complete transparency regarding our
          business relationships and revenue sources. This disclosure explains
          how we may earn compensation through affiliate partnerships while
          maintaining our commitment to providing honest, unbiased travel
          recommendations to our users.
        </p>
      </section>

      <section id="disclosure">
        <h2>Affiliate Disclosure Statement</h2>
        <p>
          Wandario participates in various affiliate marketing programs. This
          means we may earn commissions on qualifying purchases made through
          links on our website to partner sites. These partnerships help support
          our mission to provide high-quality travel content while keeping our
          core services free for users.
        </p>
        <p>
          This disclosure complies with the Federal Trade Commission's
          guidelines concerning the use of endorsements and testimonials in
          advertising.
        </p>
      </section>

      <section id="partnerships">
        <h2>Our Partnerships</h2>
        <p>
          We maintain affiliate relationships with trusted travel-related
          companies, including but not limited to:
        </p>
        <ul>
          <li>Hotel booking platforms</li>
          <li>Airlines and flight booking services</li>
          <li>Travel insurance providers</li>
          <li>Tour operators and activity providers</li>
          <li>Travel gear and equipment manufacturers</li>
          <li>Transportation services</li>
        </ul>
      </section>

      <section id="compensation">
        <h2>Compensation Disclosure</h2>
        <p>
          When you click on certain links or make purchases through our
          affiliate partners, we may receive a small commission at no additional
          cost to you. The compensation we receive may influence the products
          and services we choose to feature, but it never affects:
        </p>
        <ul>
          <li>The integrity of our content and recommendations</li>
          <li>The accuracy of our travel information</li>
          <li>Your final purchase price</li>
          <li>Our editorial independence</li>
        </ul>
      </section>

      <section id="transparency">
        <h2>Our Commitment to Transparency</h2>
        <p>
          We are committed to maintaining transparency in all our business
          relationships. To this end, we:
        </p>
        <ul>
          <li>Clearly identify affiliate links with appropriate disclosures</li>
          <li>
            Only recommend products and services we believe provide value to our
            users
          </li>
          <li>
            Maintain editorial independence in our content creation process
          </li>
          <li>
            Regularly review and update our affiliate relationships to ensure
            alignment with our values
          </li>
        </ul>
      </section>

      <section id="recommendations">
        <h2>Product Recommendations</h2>
        <p>
          Our product and service recommendations are based on thorough
          research, personal experience, and user feedback. While we may earn
          commissions through affiliate links, we:
        </p>
        <ul>
          <li>Never recommend products solely for financial gain</li>
          <li>Prioritize user experience and value in our recommendations</li>
          <li>
            Maintain honest and unbiased reviews of all products and services
          </li>
          <li>
            Regularly update our recommendations based on new information and
            user feedback
          </li>
        </ul>
        <p>
          We encourage our users to conduct their own research and make informed
          decisions based on their specific needs and circumstances.
        </p>
      </section>
    </LegalPageLayout>
  );
}
