import type { Metadata } from 'next';
import Link from '@/components/Link';
import { site } from '@/site.config';
import { pageMeta } from '@/lib/seo';
import { routes } from '@/lib/routes';
import { LegalPage } from '@/components/LegalPage';

/** Payment, notice, liability and governing law follow Antek Automation's Terms of Business at antekautomation.com/terms-of-business. */
export const metadata: Metadata = pageMeta({
  title: 'Terms of service | MaeDay',
  description: 'Terms of service for MaeDay, a service of Antek Automation.',
  path: routes.terms,
  noindex: true,
});

export default function Page() {
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;
  return (
    <LegalPage title="Terms of service">
      <p className="mt-6">
        {site.name} is a service of {site.owner}, a {site.legal.status} based at {site.address}. Contact: {mail}.
      </p>

      <h2>Summary</h2>
      <p>
        {site.name} answers your phone line during the hours you choose and follows the emergency rules and on-call ladder
        you approve. You pay monthly for your plan, billed by the second, and either side can end the service with 30
        days&apos; written notice. Mae is not an emergency service: she does not call 911, and she cannot make anyone on
        your ladder answer. We do not guarantee response times or outcomes, and our liability is capped at the fees you paid
        in the previous 12 months.
      </p>

      <h2>1. Agreement</h2>
      <p>
        These terms are between {site.owner} (&quot;we&quot;, &quot;us&quot;) and the business that signs up for{' '}
        {site.name} (&quot;you&quot;). They apply together with any written proposal or order you accept. {site.name} is
        for business use only. No change to these terms applies unless we both agree it in writing.
      </p>

      <h2>2. The service</h2>
      <ul>
        <li>
          Mae, an AI voice agent, answers your line {site.coverage.default} by default, or {site.coverage.onRequest} on
          request.
        </li>
        <li>
          She sorts each call against the emergency list you set for each property, transfers emergencies to your on-call
          ladder in the order you choose with retries and a backup, and logs everything else for the morning.
        </li>
        <li>You get an email summary of each call with a timestamp for each transfer attempt.</li>
        <li>We build and test your line with you after a setup call, before it goes live.</li>
      </ul>

      <h2>3. What Mae does not do</h2>
      <ul>
        <li>
          Mae is not an emergency service and does not call 911. Callers reporting fire, a gas smell or an injury are told
          to hang up and call 911.
        </li>
        <li>She does not judge safety beyond the rules you give her.</li>
        <li>She cannot fix it if nobody on your ladder answers. She logs every attempt and alerts you.</li>
        <li>She does not screen applicants or describe neighborhoods, and she says she is an AI if asked.</li>
      </ul>
      <p>We do not guarantee response times, that a call will reach a person, or any business result.</p>

      <h2>4. Your responsibilities</h2>
      <ul>
        <li>Give us accurate emergency lists, scripts and ladder phone numbers, and tell us promptly when they change.</li>
        <li>Make sure the people on your ladder can be reached and know they may be called.</li>
        <li>
          Make sure your leasing answers comply with fair housing law. Accommodation requests go to a person on your team.
        </li>
        <li>
          Meet your own legal obligations to tenants and callers. Every call opens with a recording notice, and you are
          responsible for how you use recordings and transcripts.
        </li>
        <li>Do not use the service for anything unlawful, for unsolicited calling or to mislead callers.</li>
      </ul>

      <h2>5. Fees and billing</h2>
      <ul>
        <li>
          Plan prices, included minutes, overage rates and the setup fee are as shown on the{' '}
          <Link href={routes.pricing}>pricing page</Link> when you sign up, or in your written order.
        </li>
        <li>
          Calls are billed by the second, with a minimum of {site.billing.minBillableSeconds} seconds per call. Spam and
          wrong numbers are not billed.
        </li>
        <li>Plan fees are charged monthly in advance.</li>
        <li>We may suspend the service if a payment is more than 14 days overdue.</li>
        <li>We give you 30 days&apos; written notice of any price change.</li>
      </ul>

      <h2>6. Ending the service</h2>
      <p>
        Either party may end the service with 30 days&apos; written notice. We may end it straight away if a payment is
        more than 30 days overdue, if you commit a material breach and do not fix it within 14 days of our written notice,
        or if you use the service unlawfully. You pay for service up to the end date. On request we send you your call logs
        before we delete them under our <Link href={routes.privacy}>privacy policy</Link>.
      </p>

      <h2>7. Other providers</h2>
      <p>
        {site.name} runs on third-party platforms, including Retell for the voice agent and Twilio and phone carriers for
        calls. We are not responsible for their outages or changes, though we will work to restore service as fast as we
        can.
      </p>

      <h2>8. Data protection</h2>
      <p>
        We process call data on your behalf and on your instructions, as set out in our{' '}
        <Link href={routes.privacy}>privacy policy</Link>. We comply with UK GDPR and the Data Protection Act 2018 and will
        sign a data processing agreement on request.
      </p>

      <h2>9. Intellectual property</h2>
      <p>
        You own your content and your call data. We own the platform, prompts, configuration and everything else we create
        to run the service, and you may use them for your business while your plan is active.
      </p>

      <h2>10. Warranties</h2>
      <p>
        We provide the service with reasonable care and skill. We do not promise it will be uninterrupted or error free, or
        that third-party platforms will stay available or unchanged. We fix faults in our work that you report to us as
        quickly as we reasonably can.
      </p>

      <h2>11. Liability</h2>
      <p>
        To the extent the law allows, our total liability to you under or in connection with these terms is limited to the
        fees you paid us in the 12 months before the event that gave rise to the claim. We are not liable for indirect or
        consequential loss, including lost profits, lost revenue, lost data, property damage or repair costs that follow
        from a call, or damage to reputation. Nothing in these terms limits liability for death or personal injury caused
        by negligence, for fraud or for anything else that cannot be limited by law.
      </p>

      <h2>12. Events outside our control</h2>
      <p>
        Neither party is liable for delay or failure caused by events beyond its reasonable control, including natural
        disasters, power, internet or telephone network failures, or the actions of third-party providers.
      </p>

      <h2>13. Changes to these terms</h2>
      <p>We give you 30 days&apos; notice by email of any change to these terms that affects you.</p>

      <h2>14. Governing law</h2>
      <p>
        These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive
        jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>
        {site.owner} ({site.legal.status}), {site.address}. Email: {mail}.
      </p>
    </LegalPage>
  );
}
