import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/ui/legal-page-layout';

export const metadata: Metadata = {
  title: 'Cookie Policy | Wandario',
  description:
    'Learn about how Wandario uses cookies and similar technologies to enhance your browsing experience and improve our services.',
  alternates: {
    canonical: '/cookies',
  },
};

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'what-are-cookies', title: 'What Are Cookies?' },
  { id: 'types-of-cookies', title: 'Types of Cookies We Use' },
  { id: 'cookie-purposes', title: 'How We Use Cookies' },
  { id: 'third-party', title: 'Third-Party Cookies' },
  { id: 'control', title: 'Cookie Control' },
  { id: 'updates', title: 'Policy Updates' },
];

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="Information about how we use cookies and similar technologies"
      lastUpdated="April 15, 2024"
      tableOfContents={tableOfContents}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          This Cookie Policy explains how Wandario uses cookies and similar
          technologies to recognize you when you visit our website. It explains
          what these technologies are and why we use them, as well as your
          rights to control our use of them.
        </p>
      </section>

      <section id="what-are-cookies">
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. They are widely used by
          website owners to make their websites work, or work more efficiently,
          as well as to provide reporting information.
        </p>
        <p>
          Cookies set by the website owner (in this case, Wandario) are called
          "first-party cookies". Cookies set by parties other than the website
          owner are called "third-party cookies". Third-party cookies enable
          third-party features or functionality to be provided on or through the
          website.
        </p>
      </section>

      <section id="types-of-cookies">
        <h2>Types of Cookies We Use</h2>
        <p>We use the following types of cookies:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Required for the operation of
            our website. They include cookies that enable you to log into secure
            areas.
          </li>
          <li>
            <strong>Analytical/Performance Cookies:</strong> Allow us to
            recognize and count the number of visitors and see how visitors move
            around our website.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> Enable the website to
            remember choices you make (such as language preferences) for a
            better experience.
          </li>
          <li>
            <strong>Targeting Cookies:</strong> Record your visit to our
            website, the pages you visit, and the links you follow to make our
            content more relevant to your interests.
          </li>
        </ul>
      </section>

      <section id="cookie-purposes">
        <h2>How We Use Cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul>
          <li>Authentication and security</li>
          <li>Preferences and features</li>
          <li>Analytics and research</li>
          <li>Personalized content and recommendations</li>
          <li>Marketing and advertising</li>
        </ul>
        <p>
          The specific types of first and third-party cookies served through our
          website and the purposes they perform are described in detail in our
          cookie settings panel.
        </p>
      </section>

      <section id="third-party">
        <h2>Third-Party Cookies</h2>
        <p>
          Our website includes functionality provided by third parties. These
          third parties set cookies which enable them to:
        </p>
        <ul>
          <li>Track your browsing across different websites</li>
          <li>Determine if their advertising is effective</li>
          <li>Provide personalized content</li>
          <li>Analyze user behavior and preferences</li>
        </ul>
        <p>
          The privacy practices of these third parties are governed by their own
          privacy policies, which we encourage you to review.
        </p>
      </section>

      <section id="control">
        <h2>Cookie Control</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You
          can exercise your cookie preferences in the following ways:
        </p>
        <ul>
          <li>
            Through our cookie consent banner when you first visit our website
          </li>
          <li>
            By adjusting your browser settings to reject or delete cookies
          </li>
          <li>Through our cookie settings panel</li>
          <li>
            By opting out of specific third-party targeting/advertising cookies
          </li>
        </ul>
        <p>
          Please note that blocking cookies may impact your experience on our
          website as some features may not function properly.
        </p>
      </section>

      <section id="updates">
        <h2>Policy Updates</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes
          in our practices or for operational, legal, or regulatory reasons.
          When we update our Cookie Policy, we will revise the "Last Updated"
          date at the top of this page and take any other steps required by
          applicable law.
        </p>
        <p>
          We encourage you to periodically review this page to stay informed
          about our use of cookies and related technologies.
        </p>
      </section>
    </LegalPageLayout>
  );
}
