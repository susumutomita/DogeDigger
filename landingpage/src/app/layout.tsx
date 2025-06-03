import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { TranslationProvider } from '@/context/TranslationContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DogeDigger - Every Step Finds Treasure',
  description:
    'Experience AR treasure hunting with robotic dogs and own AI-generated art as NFTs in this groundbreaking digital-physical experience.',
  keywords: ['NFT', 'AR', 'Robot Dogs', 'AI-generated Art', 'Treasure Hunt', 'Web3'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'DogeDigger - Every Step Finds Treasure',
    description:
      'Experience AR treasure hunting with robotic dogs and own AI-generated art as NFTs',
    images: ['/og-image.svg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DogeDigger - Every Step Finds Treasure',
    description:
      'Experience AR treasure hunting with robotic dogs and own AI-generated art as NFTs',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
