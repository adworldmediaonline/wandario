import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from '@/components/providers/SessionProvider';
import './globals.css';
import { auth } from '@/auth';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Explore Destinations, Travel Guides, and Expert Tips | Wandario',
  description:
    'Discover expert travel guides, accommodations, local cuisines, and adventure tips with Wandario. Plan your next unforgettable trip with insights and resources curated just for you.',
  keywords:
    'Travel planning, Expert travel guides, Best travel destinations, Travel inspiration, Wanderlust journeys, Personalized travel experiences, Plan your next adventure with expert tips, Discover hidden gems for your travels, Comprehensive travel planning resources',
  metadataBase: new URL('https://www.wandario.com'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'LiwVvqANoDhHaj0DGBwI2vTLm_LkIVkoLqLn_XzEJA0',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          poppins.variable
        )}
      >
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
