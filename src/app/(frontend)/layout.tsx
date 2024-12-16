import Header from '@/components/header';
import { Footer } from '@/components/ui/footer';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative flex min-h-screen flex-col">
        {children}
        <Footer />
      </main>
    </>
  );
}
