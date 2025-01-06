import HeroHeader from '@/components/ui/hero-header';
import { getCategoryById } from '@/server/db/category';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Section } from '@/components/ui/section';
import { Metadata } from 'next';
import RegionDestinationsShowcase from '@/components/region-destinations-showcase';
import RegionDestinationsSkeleton from '@/components/skeletons/region-destinations-skeleton';
import ErrorBoundaryContainer from '@/components/ui/error-boundary-container';
import { getDestinationsByCategory } from '@/server/db/destination';
import { Prose } from '@/components/ui/prose';

export async function generateMetadata(props: {
  params: Promise<{ regionId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const category = await getCategoryById(params.regionId);

  if (!category) {
    return {
      title: 'Region Not Found | Wandario',
      description: 'The requested region could not be found.',
    };
  }

  return {
    title: `${category.metaTitle} | Wandario`,
    description: category.metaDescription ?? '',
    keywords: category.metaKeywords ?? '',
    alternates: {
      canonical: `/region/${params.regionId}`,
    },
    openGraph: {
      title: category.metaTitle ?? '',
      description: category.metaDescription ?? '',
      images: [
        {
          url: category.thumbnail?.secure_url ?? '',
          width: 1200,
          height: 630,
          alt: category.name ?? '',
        },
      ],
    },
  };
}

export default async function RegionDetailsPage(props: {
  params: Promise<{ regionId: string }>;
}) {
  const params = await props.params;
  const category = await getCategoryById(params.regionId);

  if (!category) {
    notFound();
  }

  // Create the promise for destinations
  const destinationsPromise = getDestinationsByCategory(params.regionId);

  return (
    <>
      <HeroHeader
        breadcrumb={{
          segments: [
            {
              title: 'Region',
              href: '/region',
            },
            {
              title: category.name,
              href: `/region/${params.regionId}`,
            },
          ],
        }}
        title={category.name}
        excerpt={category.excerpt}
        backgroundImageId={
          category.images[0]?.public_id ?? category.thumbnail?.public_id
        }
        actions={{
          primary: {
            label: 'Explore Destinations',
            href: '#destinations',
          },
          secondary: {
            label: 'View Map',
            href: '#map',
          },
        }}
      />

      <Section id="destinations" container>
        <ErrorBoundaryContainer>
          <Suspense fallback={<RegionDestinationsSkeleton />}>
            <RegionDestinationsShowcase promise={destinationsPromise} />
          </Suspense>
        </ErrorBoundaryContainer>
      </Section>

      <Section className="py-0" container>
        <Prose>
          <div dangerouslySetInnerHTML={{ __html: category.description }} />
        </Prose>
      </Section>
    </>
  );
}
