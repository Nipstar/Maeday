/**
 * Post-deploy: tells IndexNow (Bing, Yandex and others) about every indexable URL.
 * The key file public/<indexNowKey>.txt is deployed with the site. Run after a production deploy:
 *   npm run indexnow
 */
import './load-env';
import { site } from '../src/site.config';
import { indexableRoutes } from '../src/lib/routes';

const host = new URL(site.domain).host;
const body = {
  host,
  key: site.indexNowKey,
  keyLocation: `${site.domain}/${site.indexNowKey}.txt`,
  urlList: indexableRoutes().map((p) => `${site.domain}${p}`),
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log(`indexnow: ${res.status} ${res.statusText} for ${body.urlList.length} URLs`);
if (!res.ok && res.status !== 202) process.exit(1);
