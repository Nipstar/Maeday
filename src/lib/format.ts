import { site, type Plan } from '@/site.config';
import { competitors, type Competitor, type Tier } from '@/content/competitors';

/** $197, $1,725 (whole dollars) or $0.35 (cents) */
export function money(n: number): string {
  const whole = Number.isInteger(n);
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 })}`;
}

/** Rates always show cents: $2.00, $0.70 */
export function rate(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** 1,250 */
export function num(n: number): string {
  return n.toLocaleString('en-US');
}

const [starter, growth, portfolio] = site.plans;
export { starter, growth, portfolio };

export const overageRates = site.plans.map((p) => p.overagePerMinute);
export const overageLow = Math.min(...overageRates);
export const overageHigh = Math.max(...overageRates);

/** Cost of a month on one plan for a number of minutes used. */
export function planCost(plan: Plan, minutesUsed: number): number {
  const extra = Math.max(0, minutesUsed - plan.minutes);
  return Math.round((plan.price + extra * plan.overagePerMinute) * 100) / 100;
}

/** The cheapest MaeDay plan for a number of minutes. */
export function bestPlan(minutesUsed: number): { plan: Plan; cost: number } {
  return site.plans
    .map((plan) => ({ plan, cost: planCost(plan, minutesUsed) }))
    .reduce((a, b) => (b.cost < a.cost ? b : a));
}

/** Cost of a competitor tier for a number of calls or minutes. */
export function tierCost(t: Tier, used: number): number {
  const extra = Math.max(0, used - t.amount);
  return Math.round((t.price + extra * (t.overage ?? 0)) * 100) / 100;
}

/** Worked examples: calls a month used on compare pages (minutes = calls x typical call length). */
export const examples = {
  monthlyCalls: [150],
};
export const exampleMinutes = (calls: number) => calls * site.billing.typicalCallMinutes;

/** "$150 for 75 calls; $500 for 300 calls" */
export function tierSummary(c: Competitor, opts: { short?: boolean } = {}): string {
  const parts: string[] = [];
  if (c.freeTier) parts.push(`Free for ${c.freeTier.amount} ${c.freeTier.unit}`);
  if (c.payg) parts.push(`${money(c.payg.base)} a month plus ${rate(c.payg.perMinute)} a minute`);
  for (const [i, t] of (c.tiers ?? []).entries()) {
    const unit = opts.short && i > 0 && t.unit === 'minutes' ? '' : ` ${t.unit === 'minutes' ? 'min' : 'calls'}`;
    parts.push(`${money(t.price)} for ${num(t.amount)}${unit}`);
  }
  if (c.from !== undefined) parts.push(`From ${money(c.from)} a month`);
  if (c.perUnit) parts.push(c.perUnit.map((u) => `${rate(u.price)} per unit (${u.label})`).join('; '));
  if (c.minimum) parts.push(`${money(c.minimum)} a month minimum`);
  if (c.setupFee) parts.push(`${money(c.setupFee)} setup`);
  return parts.join('; ');
}

/** Lowest and highest published per-call or per-minute overage. */
export function overageRange(c: Competitor): { low: number; high: number } | undefined {
  const rates = [c.freeTier?.overage, c.payg?.perMinute, ...(c.tiers ?? []).map((t) => t.overage)].filter(
    (x): x is number => x !== undefined,
  );
  if (!rates.length) return undefined;
  return { low: Math.min(...rates), high: Math.max(...rates) };
}

/**
 * Tokens usable in any content string. Content files never hold a raw price, minute figure or URL:
 * they say {starter.price} and fill() puts in the value from site.config.ts or competitors.ts.
 */
export const tokens: Record<string, string> = {
  name: site.name,
  persona: site.persona,
  owner: site.owner,
  founder: site.founder,
  tagline: site.tagline,
  descriptor: site.descriptor,
  'setupFee.monthly': money(site.setupFee.monthly),
  'setupFee.annual': money(site.setupFee.annual),
  overageLow: rate(overageLow),
  overageHigh: rate(overageHigh),
  typicalCallMinutes: String(site.billing.typicalCallMinutes),
  minBillableSeconds: String(site.billing.minBillableSeconds),
  'billingExample.minutes': String(site.billing.example.minutes),
  'billingExample.seconds': String(site.billing.example.seconds),
  'billingExample.roundedUpTo': String(site.billing.example.roundedUpTo),
  goLive: site.goLive,
  annual: site.annual,
  contract: site.contract,
  rollover: site.rollover,
  portfolioExtra: site.portfolioExtra,
  concurrentCalls: site.concurrentCalls,
  textAlertApproval: site.textAlertApproval,
  integrationTiming: site.timing.integration,
  tourBookingTiming: site.timing.tourBooking,
  pricesChecked: site.pricesChecked,
  lastUpdated: site.lastUpdated,
  setupCallMinutes: String(site.setupCallMinutes),
  onRequest: `${site.coverage.onRequest} on request`,
  shortDomain: site.shortDomain,
  texasRepairDays: site.sourceFigures.texasRepairDays,
  californiaRepairDays: site.sourceFigures.californiaRepairDays,
  californiaUrgentDays: site.sourceFigures.californiaUrgentDays,
  lowVolumeRentals: site.sourceFigures.lowVolumeRentals,
  lowVolumeCalls: site.sourceFigures.lowVolumeCalls,
  costComplaintLow: money(site.sourceFigures.costComplaintLow),
  costComplaintHigh: money(site.sourceFigures.costComplaintHigh),
  allPartyCount: String(site.sourceFigures.allPartyStates.length),
};

for (const p of site.plans) {
  tokens[`${p.id}.name`] = p.name;
  tokens[`${p.id}.price`] = money(p.price);
  tokens[`${p.id}.minutes`] = num(p.minutes);
  tokens[`${p.id}.calls`] = num(p.approxCalls);
  tokens[`${p.id}.overage`] = rate(p.overagePerMinute);
}

for (const c of competitors) {
  const k = `c.${c.id}`;
  tokens[`${k}.name`] = c.name;
  tokens[`${k}.checked`] = c.checked;
  tokens[`${k}.summary`] = tierSummary(c);
  if (c.from !== undefined) tokens[`${k}.from`] = money(c.from);
  if (c.minimum !== undefined) tokens[`${k}.minimum`] = money(c.minimum);
  if (c.setupFee !== undefined) tokens[`${k}.setupFee`] = money(c.setupFee);
  if (c.freeTier) {
    tokens[`${k}.free.amount`] = num(c.freeTier.amount);
    tokens[`${k}.free.overage`] = rate(c.freeTier.overage);
  }
  if (c.payg) {
    tokens[`${k}.payg.base`] = money(c.payg.base);
    tokens[`${k}.payg.perMinute`] = rate(c.payg.perMinute);
  }
  (c.tiers ?? []).forEach((t, i) => {
    tokens[`${k}.tier${i + 1}.price`] = money(t.price);
    tokens[`${k}.tier${i + 1}.amount`] = num(t.amount);
    if (t.overage !== undefined) tokens[`${k}.tier${i + 1}.overage`] = rate(t.overage);
  });
  (c.perUnit ?? []).forEach((u, i) => (tokens[`${k}.perUnit${i + 1}`] = rate(u.price)));
  const r = overageRange(c);
  if (r) {
    tokens[`${k}.overageLow`] = rate(r.low);
    tokens[`${k}.overageHigh`] = rate(r.high);
  }
}

// Worked example: {ex150.minutes}, {ex150.mae}, {ex150.maePlan}
for (const calls of examples.monthlyCalls) {
  const minutes = exampleMinutes(calls);
  const best = bestPlan(minutes);
  tokens[`ex${calls}.calls`] = num(calls);
  tokens[`ex${calls}.minutes`] = num(minutes);
  tokens[`ex${calls}.mae`] = money(best.cost);
  tokens[`ex${calls}.maePlan`] = best.plan.name;
}

export function fill(text: string): string {
  return text.replace(/\{([\w.]+)\}/g, (m, key: string) => {
    if (!(key in tokens)) throw new Error(`Unknown content token ${m} in: ${text}`);
    return tokens[key];
  });
}

/** Every price the site may show: config, derived from config, or competitors.ts. Used by scripts/check.ts. */
export function allowedPrices(): Set<number> {
  const s = new Set<number>();
  for (const p of site.plans) {
    s.add(p.price);
    s.add(p.overagePerMinute);
  }
  s.add(site.setupFee.monthly);
  s.add(site.setupFee.annual);
  s.add(site.sourceFigures.costComplaintLow);
  s.add(site.sourceFigures.costComplaintHigh);
  for (const c of competitors) {
    [c.from, c.minimum, c.setupFee, c.freeTier?.overage, c.payg?.base, c.payg?.perMinute].forEach((x) => x !== undefined && s.add(x));
    (c.tiers ?? []).forEach((t) => {
      s.add(t.price);
      if (t.overage !== undefined) s.add(t.overage);
    });
    (c.perUnit ?? []).forEach((u) => s.add(u.price));
  }
  for (const calls of examples.monthlyCalls) {
    s.add(bestPlan(exampleMinutes(calls)).cost);
    for (const c of competitors) (c.tiers ?? []).forEach((t) => s.add(tierCost(t, calls)));
  }
  return s;
}

/** Every minute figure the site may show. */
export function allowedMinutes(): Set<number> {
  const s = new Set<number>();
  for (const p of site.plans) s.add(p.minutes);
  s.add(site.billing.typicalCallMinutes);
  s.add(site.billing.example.minutes);
  s.add(site.billing.example.roundedUpTo);
  s.add(site.setupCallMinutes);
  for (const c of competitors) (c.tiers ?? []).filter((t) => t.unit === 'minutes').forEach((t) => s.add(t.amount));
  for (const calls of examples.monthlyCalls) s.add(exampleMinutes(calls));
  return s;
}
