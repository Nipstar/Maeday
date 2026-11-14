import { pricing } from '@/content/pricing';
import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const dynamic = 'force-static';
export const alt = pricing.h1;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Pricing', headline: pricing.h1 });
}
