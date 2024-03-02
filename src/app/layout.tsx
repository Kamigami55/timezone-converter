import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Time Zone Converter',
  description:
    'Easily convert time between different timezones and compare overlapping time periods.',
  metadataBase: new URL('https://timezone.eason.ch'),
  openGraph: {
    title: 'Time Zone Converter',
    description:
      'Easily convert time between different timezones and compare overlapping time periods.',
    url: 'https://timezone.eason.ch',
    siteName: 'Time Zone Converter',
    locale: 'en_US',
    type: 'website',
    // images: [
    //   {
    //     url: 'https://timezone.eason.ch/og.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Time Zone Converter',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Zone Converter',
    description:
      'Easily convert time between different timezones and compare overlapping time periods.',
    // image: 'https://timezone.eason.ch/og.png',
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
