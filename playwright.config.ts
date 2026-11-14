import { defineConfig } from '@playwright/test';

/**
 * Runs against the static export in out/ (build first). Build with test values, for example:
 *   cp .env.example .env.local && npm run build && npm test
 * Two viewports: 375 px (mobile, the design width) and 1280 px (desktop).
 */
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4173', trace: 'off' },
  webServer: {
    command: 'npx serve out -l 4173 --no-clipboard',
    url: 'http://localhost:4173/',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [
    { name: 'mobile-375', use: { viewport: { width: 375, height: 800 }, hasTouch: true, isMobile: true } },
    { name: 'desktop-1280', use: { viewport: { width: 1280, height: 900 } } },
  ],
});
