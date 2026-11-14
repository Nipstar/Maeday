import localFont from 'next/font/local';

/**
 * Self-hosted from @fontsource (static weights, Latin subset) through next/font/local, with metric-matched
 * fallbacks. Only the display face is preloaded, with font-display: swap. The body and mono faces use
 * font-display: optional: with swap, their late arrival re-wrapped the hero text and call log and pushed
 * CLS over 0.05 on slower runners (0.063 on GitHub Actions). See BUILD_LOG.md, Phase 7 fix.
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
  display: 'optional',
  preload: false,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const plexMono = localFont({
  src: [{ path: '../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2', weight: '500' }],
  variable: '--font-plex-mono',
  display: 'optional',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});
