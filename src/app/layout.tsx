import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/site.config';
import { bricolage, instrument, plexMono } from '@/lib/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Gtm } from '@/components/Gtm';
import { UtmCapture } from '@/components/UtmCapture';
import { StickyCta } from '@/components/StickyCta';
import { BookingModal } from '@/components/BookingModal';
import { JsonLd } from '@/components/JsonLd';
import { organization, website } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  applicationName: site.name,
  authors: [{ name: site.owner }],
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#10182B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[12px] focus:bg-amber focus:px-4 focus:py-2 focus:text-midnight"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
        <BookingModal />
        <JsonLd data={[organization(), website()]} />
        <UtmCapture />
        <Gtm />
      </body>
    </html>
  );
}
