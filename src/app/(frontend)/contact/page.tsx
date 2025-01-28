import { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { MessageSquare, Clock } from 'lucide-react';
import ContactForm from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with Wandario',
  description:
    'Have questions about your travel plans? Contact Wandario for personalized assistance. Our team is ready to help make your journey unforgettable.',
  keywords: [
    'Contact Wandario',
    'Travel support',
    'Travel assistance',
    'Travel inquiries',
    'Travel help',
    'Get in touch',
  ].join(', '),
  alternates: {
    canonical: '/contact',
  },
};

const contactInfo = [
  {
    icon: MessageSquare,
    title: 'General Support',
    description: 'Questions about destinations or travel plans?',
    detail: 'Our team is here to help you',
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'We aim to respond within',
    detail: '24 hours',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header Section */}
      <Section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
        </div>

        <div className="container py-12 md:py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600">
              Have questions about your travel plans? We'd love to help make
              your journey unforgettable. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section className="relative py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group p-6 rounded-2xl bg-white border shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                        <p className="text-sm font-medium text-primary mt-1">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Additional Info Card */}
              <div className="p-6 rounded-2xl bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Before You Contact Us
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2 text-sm">
                    • Please provide specific details about your travel plans
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    • Include your preferred travel dates if applicable
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    • Mention any special requirements or preferences
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border p-6 md:p-8 shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
