import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
  title: 'DogeDigger - 犬も歩けばトークン掘れる',
  description:
    'ロボット犬と一緒にAR宝探しをし、AI生成アートをNFTとして所有できる、新感覚のデジタル×フィジカル体験。',
  keywords: ['NFT', 'AR', 'ロボット犬', 'AI生成アート', '宝探し', 'Web3'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'DogeDigger - 犬も歩けばトークン掘れる',
    description: 'ロボット犬と一緒にAR宝探しをし、AI生成アートをNFTとして所有できる体験',
    images: ['/og-image.svg'],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DogeDigger - 犬も歩けばトークン掘れる',
    description: 'ロボット犬と一緒にAR宝探しをし、AI生成アートをNFTとして所有できる体験',
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
    <html lang="ja">
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
