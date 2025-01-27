import type { Metadata } from 'next';
import { Poppins, Source_Serif_4 } from 'next/font/google';
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

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-source-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wandario.com'),
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
          'min-h-screen scroll-smooth bg-background antialiased',
          poppins.variable,
          sourceSerif.variable
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
