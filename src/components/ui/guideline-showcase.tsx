'use client';

import { motion } from 'framer-motion';
import { Calendar, Globe, Leaf, Shield } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface GuidelineShowcaseProps {
  guidelines: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

const iconMap = {
  Calendar,
  Globe,
  Leaf,
  Shield,
};

export default function GuidelineShowcase({
  guidelines,
}: GuidelineShowcaseProps) {
  return (
    <div className="container py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="space-y-16"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
          >
            Our Guidelines
          </motion.h2>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-gray-600"
          >
            Follow these principles to make the most of your travel experience
          </motion.p>
        </div>

        {/* Guidelines Grid */}
        <motion.div
          variants={item}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {guidelines.map(guideline => {
            const Icon = iconMap[guideline.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={guideline.title}
                variants={item}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-3xl bg-white shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {guideline.title}
                  </h3>

                  <p className="text-gray-600">{guideline.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
