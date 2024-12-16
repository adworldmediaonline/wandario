import HeroHeader from '@/components/ui/hero-header';

export default function RegionPage() {
  return (
    <>
      <HeroHeader
        breadcrumb={{
          segments: [
            {
              title: 'Regions',
              href: '/regions',
            },
            {
              title: 'North America',
              href: '/regions/north-america',
            },
          ],
        }}
        title="Lorem Ipsum is simply dummy text of the printing"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        backgroundImageId="testing/hero-banner"
        actions={{
          primary: {
            label: 'Contact Us',
            href: '/contact',
          },
          secondary: {
            label: 'Learn More',
            href: '#',
          },
        }}
      />
      {/* Rest of your page content */}
    </>
  );
}
