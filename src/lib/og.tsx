import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '@/site.config';
import { money } from '@/lib/format';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

async function font(pkg: string, file: string) {
  // WOFF from @fontsource (Satori reads WOFF, not WOFF2). Build time only.
  return readFile(join(process.cwd(), `node_modules/@fontsource/${pkg}/files/${file}`));
}

const MARK = `data:image/svg+xml;base64,${Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" rx="26" fill="#1E2A44"/><g transform="translate(15 15) scale(2.75)"><path d="M3 11.5 12 4l9 7.5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10.2v9.3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9.3" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="9.75" y="12.25" width="4.5" height="4.5" rx="0.8" fill="#F2A93B"/></g></svg>',
).toString('base64')}`;

/** Midnight background, the lit window, eyebrow, page title, price. 1200x630. */
export async function renderOg({ eyebrow, headline }: { eyebrow: string; headline: string }) {
  const starter = site.plans[0];
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#10182B',
          padding: '72px 80px',
          fontFamily: 'Instrument Sans',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, fontWeight: 500, letterSpacing: '0.1em', color: '#F2A93B', textTransform: 'uppercase' }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Bricolage Grotesque',
            fontSize: headline.length > 55 ? 64 : 76,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            maxWidth: 1020,
          }}
        >
          {headline}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MARK} width={68} height={68} alt="" />
            <div style={{ display: 'flex', fontFamily: 'Bricolage Grotesque', fontSize: 40, fontWeight: 700, color: '#FFFFFF' }}>
              Mae<span style={{ color: '#F2A93B' }}>Day</span>
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 500, color: '#C9D0DD' }}>From {money(starter.price)}/mo</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Bricolage Grotesque', data: await font('bricolage-grotesque', 'bricolage-grotesque-latin-700-normal.woff'), weight: 700, style: 'normal' },
        { name: 'Instrument Sans', data: await font('instrument-sans', 'instrument-sans-latin-500-normal.woff'), weight: 500, style: 'normal' },
      ],
    },
  );
}
