import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement, lazy, Suspense } from 'react';
import { ScrollRestoration } from 'react-router';

import HomepageSameAsJsonLd from '@/components/HomepageSameAsJsonLd';
import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingCTA from '@/components/FloatingCTA';

interface RootLayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Website>
      <LoadingScreen />
      <Helmet>
        <title>Pre-Engineered Buildings Across India | AA Spaces</title>
        <meta name="description" content="AA Spaces delivers pre-engineered building solutions across India." />
      </Helmet>
      <HomepageSameAsJsonLd />
      <ScrollRestoration />
      <Header />
      {children}
      <Footer />
      <FloatingCTA />
    </Website>
  );
}
