'use client';

import { motion } from 'framer-motion';
import { Section } from './section';
import { Compass, MapPin, CheckCircle, Utensils, Hotel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Variants } from 'framer-motion';

interface PlanningItem {
  icon: React.ElementType;
  title: string;
  content: string;
}

const planningItems: PlanningItem[] = [
  {
    icon: MapPin,
    title: 'Itineraries',
    content:
      'A well-made schedule might begin in energetic cities renowned for their distinctive attractions and dynamic ambience. From there, set out for road drives or excursions to stunning national parks or calm beach places. Including adventure mixed with leisure will improve your trip.',
  },
  {
    icon: CheckCircle,
    title: "To Do's",
    content:
      'Every place presents famous sites with plenty of outdoor activities. Participate in exciting excursions like water sports at picturesque beaches, skiing on snow-covered slopes, or trekking across gorgeous paths. Making unforgettable experiences throughout your trips depends on these kinds of activities.',
  },
  {
    icon: Utensils,
    title: 'What to Eat?',
    content:
      'One delight of travel is culinary variety. From street food to luxury dining, savour local cuisine that captures the essence of every area. Try regional specialities emphasising fresh foods and traditional culinary techniques.',
  },
  {
    icon: Hotel,
    title: 'To Stay',
    content:
      'There are opulent hotels, resorts, reasonably priced hostels, and small bed-and-breakfasts among the accommodations. Discover special events in lodges within national parks or boutique hotels highlighting regional history and culture.',
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface TripPlanningSectionProps {
  className?: string;
  variant?: 'default' | 'alternate';
}

export function TripPlanningSection({
  className,
  variant = 'default',
}: TripPlanningSectionProps) {
  const isAlternate = variant === 'alternate';

  return (
    <Section className={className} container>
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div variants={item}>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Compass className="w-4 h-4 mr-2" />
                Trip Planning
              </span>
            </motion.div>

            <motion.h2
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
            >
              Plan Your Next Adventure
            </motion.h2>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-gray-600"
            >
              Travelling the globe means negotiating a range of environments,
              cultures, and temperature zones. When deciding your vacation
              dates, take local events and weather into account to maximise your
              trip. To guarantee a well-rounded trip, design an agenda that
              strikes a mix of urban discovery, natural beauty, and cultural
              encounters.
            </motion.p>
          </div>

          {/* Planning Grid */}
          <motion.div
            variants={item}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {planningItems.map(planningItem => {
              const Icon = planningItem.icon;
              return (
                <motion.div
                  key={planningItem.title}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className={cn(
                    'group p-8 rounded-3xl transition-all duration-300',
                    isAlternate
                      ? 'bg-white shadow-lg shadow-gray-200/50 hover:shadow-xl'
                      : 'bg-gray-50/50 hover:bg-white hover:shadow-lg'
                  )}
                >
                  <div className="space-y-4">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">
                      {planningItem.title}
                    </h3>

                    <p className="text-gray-600">{planningItem.content}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
