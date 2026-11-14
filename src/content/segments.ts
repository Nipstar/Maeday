import type { Segment } from './types';

/** One object per segment page (/apartments/, /hoa/, ...). Unique copy for each segment's real calls. */
export const segments: Segment[] = [];

export function getSegment(slug: string): Segment | undefined {
  return segments.find((s) => s.slug === slug);
}
