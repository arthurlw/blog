import '../styles/globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Arthur's Open Source Blog",
  description: 'A simple blog built with Next.js and Markdown',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 py-12 max-w-2xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}