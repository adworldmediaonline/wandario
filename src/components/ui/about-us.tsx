import { Section } from './section';
import CloudinaryImage from '../cloudinary-image';
import { Heart } from 'lucide-react';
import { MotionDiv } from '@/components/framer-motion-div/motion-div';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutUs() {
  return (
    <Section className="relative overflow-hidden" container>
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7 relative z-10"
          >
            {/* Badge */}
            <MotionDiv
              variants={fadeUpVariant}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
            >
              <Heart className="w-4 h-4 mr-2" />
              About Wandario
            </MotionDiv>

            {/* Main Content */}
            <div className="relative">
              <MotionDiv variants={fadeUpVariant} className="space-y-8">
                {/* Opening Statement */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                    Curiosity sets the journey off,
                  </span>{' '}
                  <span className="inline-flex items-baseline">
                    let{' '}
                    <span className="text-primary relative mx-2">
                      Wandario
                      <div className="absolute -bottom-1 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
                    </span>
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                    be your travel companion in unforgettable adventures!
                  </span>
                </h2>

                {/* Main Description */}
                <div className="relative space-y-6">
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-primary/5 rounded-full" />
                    <p className="pl-6 text-xl text-gray-600 leading-relaxed">
                      For Wandario, life is what travel is, for travel has more
                      magic that changes life; it's about the wonderful journey
                      that it takes one through as they go through life
                      experiences along the way.
                    </p>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    Your modern, energetic, and enthusiastic travel partner will
                    commit itself to making every moment of your trip just
                    extraordinary.
                  </p>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>

          {/* Image Side */}
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariant}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <CloudinaryImage
                  src="pexels-vince-2265876_1_mikk0t"
                  alt="Travel experiences"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[280px]"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Let's transform your travel dreams
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      into unforgettable adventures with Wandario-your go-to
                      travel experts and trusted guide on your journey to
                      wanderlust!
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl" />
            </div>
          </MotionDiv>
        </div>
      </div>
    </Section>
  );
}
