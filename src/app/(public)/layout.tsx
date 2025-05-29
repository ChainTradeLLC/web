import type { Metadata } from 'next';
import '../globals.scss';
import Header from '@/src/components/header/header';
import Footer from '@/src/components/footer/footer';
import AuthProvider from '@/src/app/providers/auth';

export const metadata: Metadata = {
  title: 'ChainTrade - Home',
  description:
    'The operating system for decentralized, trustless, and permissioned commerce on the blockchain.',
  keywords: 'ChainTrade, commerce, decentralized, trustless, blockchain',
    alternates: {
      canonical: '/',
    },
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
        <Header />
      {children}
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}