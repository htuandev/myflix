import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { METADATA_TITLE } from '@/constants';
import './globals.css';

const roboto = Roboto({
  subsets: ['vietnamese', 'latin'],
  weight: ['100', '300', '400', '500', '700', '900']
});

export const metadata: Metadata = {
  title: METADATA_TITLE
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi'>
      <body className={`dark ${roboto.className} flex min-h-screen flex-col`}>
        <Header />
        <main className=' flex-1'>{children}</main>
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
