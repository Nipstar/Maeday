/**
 * Writes public/llms.txt and public/llms-full.txt from the content files (runs in prebuild).
 * Phase 1 version: description, plans and contact. Expanded with every page in Phase 6.
 */
import './load-env';
import { writeFileSync } from 'node:fs';
import { site } from '../src/site.config';
import { money, num, rate } from '../src/lib/format';

const url = (p: string) => `${site.domain}${p}`;
const summary = `${site.name} is an after-hours answering service for US property managers, run by ${site.owner}. Mae, an AI voice agent, answers tenant, owner, prospect and vendor calls when the office is closed, checks each emergency against the manager's own list for that property, calls the on-call tech (then retries, then the backup), logs routine requests for the morning and emails a timestamped summary of every call.`;
const plans = site.plans
  .map((p) => `- ${p.name}: ${money(p.price)} a month, ${num(p.minutes)} minutes (about ${num(p.approxCalls)} calls), then ${rate(p.overagePerMinute)} a minute`)
  .join('\n');
const llms = `# ${site.name}

> ${summary}

## Plans

${plans}

## Pages

- [Home](${url('/')})
`;
writeFileSync('public/llms.txt', llms);
writeFileSync('public/llms-full.txt', llms);
console.log(`llms: wrote public/llms.txt (${llms.length} chars)`);
