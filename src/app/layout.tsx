import type { Metadata } from 'next';
import './globals.css';

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
      <body className={`antialiased h-screen`}>{children}</body>
    </html>
  );
}
