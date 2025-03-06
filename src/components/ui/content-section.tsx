import { cn } from '@/lib/utils';
import CloudinaryImage from '../cloudinary-image';
import { Section } from './section';
import {
  MotionDiv,
  MotionH2,
  MotionSpan,
} from '../framer-motion-div/motion-div';

interface ContentSectionProps {
  title?: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'alternate';
  children?: React.ReactNode;
  imageId?: string;
  imagePosition?: 'left' | 'right';
}

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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

const decorationVariants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export function ContentSection({
  title,
  content,
  icon,
  className,
  variant = 'default',
  children,
  imageId,
  imagePosition = 'right',
}: ContentSectionProps) {
  // Split title into words for animation
  const words = title?.split(' ') ?? [];
  const mainTitle = words.slice(0, -3).join(' ');
  const highlightedWords = words.slice(-3).join(' ');

  return (
    <Section
      className={cn(
        'relative w-full overflow-hidden py-12 md:py-16',
        variant === 'alternate' && 'bg-gray-50/50',
        className
      )}
      container
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-3xl" />
      </div>

      <div>
        <MotionDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={container}
          className={cn(
            'grid gap-8 lg:gap-12',
            imageId && 'lg:grid-cols-2',
            variant === 'centered' &&
              !imageId &&
              'text-center mx-auto max-w-4xl'
          )}
        >
          {/* Content Side */}
          <MotionDiv
            variants={item}
            className={cn(
              'space-y-8',
              imagePosition === 'left' && imageId && 'lg:order-2'
            )}
          >
            {/* Header */}
            <div className="space-y-4">
              {icon && (
                <MotionDiv
                  variants={item}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20"
                >
                  {icon}
                </MotionDiv>
              )}

              <div className="relative">
                <MotionH2
                  variants={titleVariants}
                  className="relative text-3xl font-bold sm:text-4xl md:text-5xl"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                    {mainTitle}{' '}
                  </span>
                  <span className="relative inline-block text-primary">
                    {highlightedWords}
                    <MotionSpan
                      variants={decorationVariants}
                      className="absolute left-0 right-0 bottom-2 h-3 bg-primary/20 -z-10 rounded-full"
                    />
                  </span>
                </MotionH2>
                {/* Decorative Elements */}
                <MotionDiv
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full"
                />
              </div>

              <MotionDiv
                variants={item}
                className="prose prose-gray prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Additional Content */}
            {children && (
              <MotionDiv variants={item} className="pt-8">
                {children}
              </MotionDiv>
            )}
          </MotionDiv>

          {/* Image Side */}
          {imageId && (
            <MotionDiv
              variants={imageVariants}
              className={cn(
                'relative aspect-square lg:aspect-auto',
                imagePosition === 'left' && 'lg:order-1'
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <CloudinaryImage
                  src={imageId}
                  alt={title ?? ''}
                  // width={800}
                  // height={600}
                  fill
                  crop="fill"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover w-full h-full"
                />
                {/* Decorative Elements */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-black/0 to-black/5" />
              </div>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </Section>
  );
}
