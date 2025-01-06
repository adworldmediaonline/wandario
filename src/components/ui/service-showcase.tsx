'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import CloudinaryImage from '@/components/cloudinary-image';
import { showcaseData } from '@/lib/app-data';
import { Section } from './section';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceShowcaseProps {
  title: string;
  description: string;
  services: Service[];
  ctaText?: string;
  backgroundImageId: string;
}

export default function ServiceShowcaseWrapper() {
  return (
    <ServiceShowcase
      {...showcaseData}
      backgroundImageId="sdtomqdwgsxcpeod7sr0_bln7jd"
    />
  );
}

export function ServiceShowcase({
  title,
  description,
  services,
  ctaText = 'Know More',
  backgroundImageId = 'sdtomqdwgsxcpeod7sr0_bln7jd',
}: ServiceShowcaseProps) {
  return (
    <Section className="relative overflow-hidden py-10 md:py-20" container>
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <CloudinaryImage
          src={backgroundImageId}
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-300 mb-8">{description}</p>
          {ctaText && (
            <Button
              // onClick={onCtaClick}
              variant="secondary"
              className="rounded-full hover:scale-105 transition-transform"
            >
              {ctaText}
            </Button>
          )}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 h-full border border-white/10">
                <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
