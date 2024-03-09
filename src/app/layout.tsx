import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Time Zone Converter',
  description:
    'Easily convert time between different timezones and compare overlapping time periods.',
  metadataBase: new URL('https://timez.eason.ch'),
  openGraph: {
    title: 'Time Zone Converter',
    description:
      'Easily convert time between different timezones and compare overlapping time periods.',
    url: 'https://timez.eason.ch',
    siteName: 'Time Zone Converter',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://timez.eason.ch/og.png',
        width: 1200,
        height: 630,
        alt: 'Time Zone Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Zone Converter',
    description:
      'Easily convert time between different timezones and compare overlapping time periods.',
    images: [
      {
        url: 'https://timez.eason.ch/og.png',
        width: 1200,
        height: 630,
        alt: 'Time Zone Converter',
      },
    ],
    creator: '@EasonChang_me',
    // site: '@easonchang',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
