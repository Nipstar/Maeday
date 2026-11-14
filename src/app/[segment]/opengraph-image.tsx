import { getSegment, segments } from '@/content/segments';
import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const alt = 'MaeDay after-hours answering';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return segments.map((s) => ({ segment: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ segment: string }> }) {
  const s = getSegment((await params).segment)!;
  return renderOg({ eyebrow: s.eyebrow, headline: s.h1 });
}
