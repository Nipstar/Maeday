import type { ComparePage } from './types';

/** One object per /compare/[slug]/ page. Every competitor fact comes from competitors.ts. */
export const comparePages: ComparePage[] = [];

export function getComparePage(slug: string): ComparePage | undefined {
  return comparePages.find((c) => c.slug === slug);
}
