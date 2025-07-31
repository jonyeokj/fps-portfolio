import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'FPS Portfolio',
  description:
    'A first-person shooter portfolio showcasing my experiences and projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
