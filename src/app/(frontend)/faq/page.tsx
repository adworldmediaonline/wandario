import { Metadata } from 'next';
import { FAQ } from '@/components/ui/faq';

export const metadata: Metadata = {
  title: 'Wandario FAQs: Your Complete Travel Information Resource',
  description:
    "Explore Wandario's FAQs to learn about travel recommendations, budget ideas, lodging, safety suggestions, and more. Find out how to maximise your trips!",
  keywords:
    'Travel, Travelodge, Kayak flights, Train ticket booking, Trip, TSA PreCheck, Luggage, Global Entry, Trip planner, Duffle bag, Online train ticket booking, International flights, Travel insurance, Travel safe, IRCTC train ticket booking, Make my trip flight, Safe travels, Google trips, Air India flight booking, Packing cubes',
  alternates: {
    canonical: '/faq',
  },
};

const faqs = [
  {
    question: 'What is Wandario?',
    answer:
      'Wandario is a vacation website that offers information, tips, and tools for people wanting to visit different places around the world. If you want information on vacation spots, helpful tips, or cultural knowledge, Wandario can help you.',
  },
  {
    question: 'How can I get travel guides for certain places?',
    answer:
      'To find travel guides, just go to the "Destinations" area on our website. Here you find helpful local advice and information about well-known locations, including activities to do, places to stay, and handy guides.',
  },
  {
    question: 'How can I save money when I travel?',
    answer:
      'Wandario offers many cheap travel tips and hacks on our blog. To help you enjoy your stay without overpaying, we provide information on reasonably priced housing, food, and transportation choices.',
  },
  {
    question: 'What kinds of places to stay does Wandario suggest?',
    answer:
      'We suggest different places to stay, from fancy hotels to affordable hostels and special homestays. We aim to offer choices that suit various likes and budgets.',
  },
  {
    question:
      'How can I keep informed on the most recent travel ideas and advice?',
    answer:
      'Follow us on social media to keep updated. To keep you up-to-date, we often share tales, travel advice, and destination-specific data.',
  },
  {
    question: 'Can I contact Wandario for any specific enquiries?',
    answer:
      'Contact us via the "Contact Us" link on our website to enquire about your travel plans.',
  },
  {
    question: 'What safety tips does Wandario provide for travellers?',
    answer:
      'Wandario gives important safety tips for travellers. They stress that staying safe is crucial when you travel. We offer advice on being aware of your environment, keeping your things safe, and knowing local practices and rules.',
  },
  {
    question:
      'Can I find details about local cultures and rituals on Wandario?',
    answer:
      'Yes! Our website has information about the local cultures, practices, and customs of different places. This knowledge helps travellers connect properly with local people.',
  },
  {
    question: 'How often does Wandario update its content?',
    answer:
      'We work to keep our articles and tips up-to-date and useful by changing them regularly. Look forward to new blog posts, trip spotlights, and tips all year long.',
  },
  {
    question: 'Does Wandario have a mobile app?',
    answer:
      "You can currently view Wandario on our website, which works well on mobile devices. We don't have a specific app right now, but you can easily access our material from your phone or computer.",
  },
];

export default function FAQPage() {
  return (
    <FAQ
      h1="Wandario FAQs: Your Travel Info Centre"
      description=" Welcome to the Wandario FAQ section, where you can find answers to common travel questions, money-saving advice, hotel-related knowledge, and more. Wandario is dedicated to guiding you through the travel landscape, whether planning your next trip or seeking assistance."
      items={faqs}
      className="bg-gray-50/50 pt-16 md:pt-20"
      variant="centered"
    />
  );
}
