import { Sun, MapPin, Grid, Camera } from 'lucide-react';
import type { Service } from '@/components/ui/service-showcase';
import type { FAQItem } from '@/components/ui/faq';

export const homeFAQs: FAQItem[] = [
  {
    question:
      'What kind of travel destinations does your travel guide website cover?',
    answer:
      'Our travel guide website will cover a broad range of destinations, from the most touristy cities and popular cities to hidden gems and remote off-the-beaten-path locations. Be it urban cities in full swing or the tranquility of the countryside or the enticing beaches, we provide more detailed guides on destinations globally.',
  },
  {
    question: 'Am I able to find hotel and restaurant reviews on your website?',
    answer:
      'Of course! Our website provides you with reviews from both experts and users about accommodation, restaurants, and also things to do at your chosen destination. You will further get ratings, detailed description, and personal experiences in order to help you out in making the right selection of where to eat or stay based on your likings and dislikes.',
  },
  {
    question: 'How can I make a travel plan using your website?',
    answer:
      'You can plan your trip by just browsing our destination guides for detailed itineraries and accommodation suggestions, dining options, and top attractions of this place. We also feature tips on transportation, the local customs, and a lot of activities that complete an experience for you. Our database can be filtered based on your interests, budget, or trip duration.',
  },
  {
    question:
      'Can I find information about culture and traditions on your site?',
    answer:
      "Yes, we provide an insight into the local culture, traditions, and etiquette for each destination. That includes advice on customs, language tips, cultural dos and don'ts, and important local holidays. It is our intention to let travelers respect and engage with the culture of the places they visit.",
  },
  {
    question: 'Do the travel guides update frequently?',
    answer:
      'We update our travel guides so you have all the latest information on where to stay, what to eat, and where to visit. Based on user reviews and changes in local conditions-openings, closings, changes-we continually update our content so you get all the best and latest details in preparing for your trip.',
  },
];

export const photographyServices: Service[] = [
  {
    icon: Sun,
    title: 'Lighting',
    description:
      'Good lighting makes good photography. It might be the soft glow of dawn, the golden glow of sunset, or it might be a dramatic contrast with midday, but light can work wonders for your images, bringing your scenes to life.',
  },
  {
    icon: MapPin,
    title: 'Location Scouting',
    description:
      'One can find unique and photogenic locations by reading travel guides, blogs, and browsing social media. Read about accessibility, the best time to visit, weather conditions, and how busy the places might be to ensure capturing the perfect shot.',
  },
  {
    icon: Grid,
    title: 'Composition and Framing',
    description:
      'The Rule of Thirds is pretty simple yet powerful enough to enhance a picture. If you place along the grid lines, then by doing so, you get the harmonious and very dynamic compositions that really appear nice.',
  },
  {
    icon: Camera,
    title: 'Stability and Precision',
    description:
      'A good camera setup is the first thing to have for producing sharp, steady shots. You can shoot anything: long exposures, panoramic views, or close-ups. Keep the camera stable, which will produce clearer, professional-looking results.',
  },
];

export const showcaseData = {
  title: 'Photography',
  description:
    'We get to capture the essence of every moment, which can be revisited anytime with a camera. In the case of traveling alone, this becomes a trusted companion, and the highlights of our adventure are preserved. The opportunity to share these shots on Instagram, Facebook, and other such media will let others experience the beauty and excitement of our travel. Through photographs, we can relive the magic of our journeys and keep those unforgettable memories alive.',
  services: photographyServices,
  backgroundImageId: 'testing/photography',
};
