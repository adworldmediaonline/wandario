import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt =
  'Explore Destinations, Travel Guides, and Expert Tips | Wandario';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Font loading
const interBold = fetch(
  new URL('https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff', import.meta.url)
).then(res => res.arrayBuffer());

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      >
        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/datdyxl7o/image/upload/o_100/c_fill,w_1200,h_630,g_auto/f_webp/q_90/v1/hero-banner_imkrwg"
          alt="Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.8,
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
            padding: '0 48px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              letterSpacing: '-0.05em',
              lineHeight: 1.1,
              marginBottom: 24,
              fontFamily: 'Inter',
              background: 'linear-gradient(to right, #fff, #f7f7f7)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Wandario
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              opacity: 0.9,
              maxWidth: 800,
              fontFamily: 'Inter',
            }}
          >
            Explore Destinations, Travel Guides, and Expert Tips
          </div>
          <div
            style={{
              fontSize: 24,
              opacity: 0.7,
              marginTop: 16,
              maxWidth: 720,
              fontFamily: 'Inter',
              lineHeight: 1.4,
            }}
          >
            Plan your next unforgettable trip with insights curated just for you
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
