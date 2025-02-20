import HeroHeader from '@/components/ui/hero-header';
import { Metadata } from 'next';
// import { Heart } from 'lucide-react';
import { getPublishedPageById } from '@/server/db/page';
import { notFound } from 'next/navigation';
import DynamicContentSection from '@/components/ui/dynamic-content-section';

export async function generateMetadata(props: {
  params: Promise<{ pagesId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPublishedPageById(params.pagesId);

  if (!page) {
    return {
      title: 'Page Not Found | Wandario',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: `${page?.metaTitle ?? ''} | Wandario`,
    description: page?.metaDescription ?? '',
    keywords: page?.metaKeywords ?? '',
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page?.metaTitle ?? '',
      description: page?.metaDescription ?? '',
      images: [
        {
          url: page?.hero?.backgroundImage?.secure_url ?? '',
          width: 1200,
          height: 630,
          alt: page?.title ?? '',
        },
      ],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ pagesId: string }>;
}) {
  const params = await props.params;
  const page = await getPublishedPageById(params.pagesId);

  if (!page) {
    return notFound();
  }

  console.log(page);

  return (
    <>
      <HeroHeader
        title={page?.hero?.title ?? ''}
        excerpt={page?.hero?.content ?? ''}
        backgroundImageId={page?.hero?.backgroundImage?.public_id ?? ''}
        breadcrumb={{
          segments: [
            {
              title: page?.title ?? '',
              href: `/${page.slug}`,
            },
          ],
        }}
        actions={{
          primary: {
            label: page?.hero?.ctaButton?.label ?? '',
            href: page?.hero?.ctaButton?.href ?? '',
          },
        }}
      />

      {page?.sections?.map(section => (
        <DynamicContentSection
          key={section.order}
          // title={section?.title ?? ''}
          content={section.content ?? ''}
          variant="centered"
          // icon={<Heart className="w-6 h-6" />}
          imageId={section.image?.public_id ?? ''}
          imagePosition={section?.imagePosition ?? 'right'}
        />
      ))}
    </>
  );
}
