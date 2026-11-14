import { servicePage } from '@/content/service';
import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const dynamic = 'force-static';
export const alt = servicePage.h1;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Maintenance answering', headline: servicePage.h1 });
}
