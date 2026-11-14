// Post-build (runs before the checks): loads the Next.js runtime chunks just after the first frame is
// painted instead of from <head>. The page is fully server-rendered HTML, so nothing visible waits for
// them; moving them out of the critical path lets the text, CSS and display font load first.
// Hydration is unaffected: Next buffers its inline data in self.__next_f until the runtime arrives,
// exactly as it would on a slow network. Old browsers' noModule scripts are left as they are.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.env.CHECK_OUT || 'out';
const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : n.endsWith('.html') ? [join(d, n)] : []));

let pages = 0;
for (const file of walk(OUT)) {
  let html = readFileSync(file, 'utf8');
  if (html.includes('data-deferred-runtime')) continue;
  const srcs = [];
  html = html.replace(/<script src="(\/_next\/static\/chunks\/[^"]+\.js)" async=""><\/script>/g, (_, src) => {
    if (!srcs.includes(src)) srcs.push(src);
    return '';
  });
  html = html.replace(/<link rel="preload" as="script" fetchPriority="low" href="\/_next\/static\/chunks\/[^"]+"\/>/g, '');
  if (!srcs.length) continue;
  const loader = `<script data-deferred-runtime>(function(){var s=${JSON.stringify(srcs)};function l(){s.forEach(function(u){var e=document.createElement('script');e.src=u;e.async=true;document.body.appendChild(e)})}if('requestAnimationFrame' in window){requestAnimationFrame(function(){setTimeout(l,0)})}else{setTimeout(l,0)}})()</script>`;
  html = html.replace('</body>', `${loader}</body>`);
  writeFileSync(file, html);
  pages++;
}
console.log(`defer-scripts: runtime chunks deferred to after first paint on ${pages} pages`);
