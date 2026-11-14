import localFont from 'next/font/local';

/**
 * Self-hosted from @fontsource (static weights, Latin subset). next/font/local adds font-display: swap
 * and metric-matched fallbacks (no CLS). Only the display face is preloaded.
 */
export const bricolage = localFont({
  src: [
    { path: '../../node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff2', weight: '600' },
    { path: '../../node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff2', weight: '700' },
  ],
  variable: '--font-bricolage',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const instrument = localFont({
  src: [
    { path: '../../node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-400-normal.woff2', weight: '400' },
    { path: '../../node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-500-normal.woff2', weight: '500' },
    { path: '../../node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff2', weight: '600' },
  ],
  variable: '--font-instrument',
  display: 'swap',
  preload: false,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const plexMono = localFont({
  src: [{ path: '../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2', weight: '500' }],
  variable: '--font-plex-mono',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});
