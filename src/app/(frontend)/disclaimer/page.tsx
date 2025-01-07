import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/ui/legal-page-layout';

export const metadata: Metadata = {
  title: 'Disclaimer | Wandario',
  description:
    "Important disclaimers regarding the use of Wandario's travel information, recommendations, and services.",
  alternates: {
    canonical: '/disclaimer',
  },
};

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'information', title: 'Information Accuracy' },
  { id: 'travel-risks', title: 'Travel Risks & Safety' },
  { id: 'recommendations', title: 'Travel Recommendations' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'medical', title: 'Medical & Health Information' },
  { id: 'liability', title: 'Limitation of Liability' },
];

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      description="Important information about the use of our travel content and services"
      lastUpdated="April 15, 2024"
      tableOfContents={tableOfContents}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          The information provided on Wandario is for general informational
          purposes only. While we strive to keep our content accurate and
          up-to-date, we make no representations or warranties of any kind,
          express or implied, about the completeness, accuracy, reliability,
          suitability, or availability of the information, products, services,
          or related graphics contained on the website.
        </p>
      </section>

      <section id="information">
        <h2>Information Accuracy</h2>
        <p>
          While we make every effort to provide accurate and current
          information:
        </p>
        <ul>
          <li>
            Travel information, prices, and details may change without notice
          </li>
          <li>Local conditions and services may vary from what is described</li>
          <li>
            Cultural practices and customs may differ from our descriptions
          </li>
          <li>Weather conditions and natural phenomena are unpredictable</li>
        </ul>
        <p>
          Users should independently verify critical information before making
          travel decisions.
        </p>
      </section>

      <section id="travel-risks">
        <h2>Travel Risks & Safety</h2>
        <p>
          Travel inherently involves risks. By using our website and following
          our recommendations:
        </p>
        <ul>
          <li>
            You acknowledge that travel involves personal risk and potential
            hazards
          </li>
          <li>You accept responsibility for your own safety and well-being</li>
          <li>
            You agree to research and follow local safety guidelines and
            regulations
          </li>
          <li>
            You understand that conditions can change rapidly in any destination
          </li>
        </ul>
      </section>

      <section id="recommendations">
        <h2>Travel Recommendations</h2>
        <p>
          Our travel recommendations are based on personal experiences,
          research, and user feedback. However:
        </p>
        <ul>
          <li>
            Experiences may vary based on individual preferences and
            circumstances
          </li>
          <li>
            We cannot guarantee satisfaction with recommended services or
            destinations
          </li>
          <li>
            Local conditions and service quality may change after our review
          </li>
          <li>
            Users should conduct their own research before making travel
            decisions
          </li>
        </ul>
      </section>

      <section id="third-party">
        <h2>Third-Party Services</h2>
        <p>
          Wandario may link to or recommend third-party services. We are not
          responsible for:
        </p>
        <ul>
          <li>The quality of third-party services or products</li>
          <li>Changes in pricing or availability</li>
          <li>Accuracy of third-party information</li>
          <li>
            Any losses or damages resulting from using third-party services
          </li>
        </ul>
      </section>

      <section id="medical">
        <h2>Medical & Health Information</h2>
        <p>
          Any health or medical information provided on our website is for
          general guidance only and should not be considered professional
          medical advice. Before traveling:
        </p>
        <ul>
          <li>Consult with healthcare professionals about travel risks</li>
          <li>Research and obtain necessary vaccinations and medications</li>
          <li>Verify your insurance coverage for international medical care</li>
          <li>Consider local healthcare availability at your destination</li>
        </ul>
      </section>

      <section id="liability">
        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Wandario shall not be liable
          for any direct, indirect, incidental, consequential, or punitive
          damages arising out of:
        </p>
        <ul>
          <li>Access to or use of our website and services</li>
          <li>Any errors or omissions in our content or recommendations</li>
          <li>Decisions made based on information provided on our platform</li>
          <li>
            Any losses or injuries sustained while following our travel advice
          </li>
        </ul>
        <p>
          By using Wandario, you agree to hold us harmless from any claims
          arising from your use of our website and services.
        </p>
      </section>
    </LegalPageLayout>
  );
}
