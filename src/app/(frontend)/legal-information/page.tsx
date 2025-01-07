import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/ui/legal-page-layout';

export const metadata: Metadata = {
  title: 'Legal Information | Wandario',
  description:
    'Important legal information about Wandario, including terms of use, intellectual property rights, and legal compliance.',
  alternates: {
    canonical: '/legal-information',
  },
};

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'intellectual-property', title: 'Intellectual Property Rights' },
  { id: 'content-ownership', title: 'Content Ownership' },
  { id: 'third-party', title: 'Third-Party Content' },
  { id: 'compliance', title: 'Legal Compliance' },
  { id: 'changes', title: 'Changes to Legal Information' },
];

export default function LegalInformationPage() {
  return (
    <LegalPageLayout
      title="Legal Information"
      description="Important legal information about using Wandario's services and content"
      lastUpdated="April 15, 2024"
      tableOfContents={tableOfContents}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          This legal information page provides important details about the legal
          aspects of using Wandario's services. By accessing and using our
          website, you acknowledge and agree to comply with all applicable laws
          and regulations.
        </p>
      </section>

      <section id="intellectual-property">
        <h2>Intellectual Property Rights</h2>
        <p>
          All content published on Wandario, including but not limited to text,
          graphics, logos, images, audio clips, digital downloads, and data
          compilations, is the property of Wandario or its content suppliers and
          is protected by international copyright laws.
        </p>
        <p>
          The compilation of all content on this site is the exclusive property
          of Wandario and is protected by international copyright laws. All
          software used on this site is the property of Wandario or its software
          suppliers and is protected by international copyright laws.
        </p>
      </section>

      <section id="content-ownership">
        <h2>Content Ownership</h2>
        <p>
          Users retain ownership of all intellectual property rights in their
          content. By posting content on Wandario, you grant us a worldwide,
          non-exclusive, royalty-free license to use, reproduce, modify, adapt,
          publish, translate, and distribute it in any existing or future media.
        </p>
        <ul>
          <li>
            You represent and warrant that you own or control all rights to the
            content you post
          </li>
          <li>
            You are responsible for ensuring your content does not violate any
            third-party rights
          </li>
          <li>
            Wandario reserves the right to remove any content that violates
            these terms
          </li>
        </ul>
      </section>

      <section id="third-party">
        <h2>Third-Party Content</h2>
        <p>
          Our platform may include content from third parties, including
          advertisements and links to other websites. We are not responsible for
          the content of any linked third-party website. The inclusion of any
          link does not imply endorsement by Wandario of the site.
        </p>
        <p>
          Users are encouraged to review the terms of service and privacy
          policies of any third-party websites they visit through links on our
          platform.
        </p>
      </section>

      <section id="compliance">
        <h2>Legal Compliance</h2>
        <p>
          Wandario is committed to complying with all applicable laws and
          regulations. We cooperate with law enforcement inquiries and honor
          legal requests for information when required by law.
        </p>
        <ul>
          <li>Compliance with international travel regulations</li>
          <li>Adherence to data protection and privacy laws</li>
          <li>Commitment to fair business practices</li>
          <li>Protection of intellectual property rights</li>
        </ul>
      </section>

      <section id="changes">
        <h2>Changes to Legal Information</h2>
        <p>
          Wandario reserves the right to modify this legal information at any
          time. We will notify users of any material changes through our website
          or via email. Your continued use of our services after such
          modifications constitutes your acceptance of the updated terms.
        </p>
      </section>
    </LegalPageLayout>
  );
}
