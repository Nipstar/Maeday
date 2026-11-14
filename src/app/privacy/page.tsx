import type { Metadata } from 'next';
import { site } from '@/site.config';
import { pageMeta } from '@/lib/seo';
import { routes } from '@/lib/routes';
import { LegalPage } from '@/components/LegalPage';

/** Retention periods and registration details follow Antek Automation's own policy at antekautomation.com/privacy-policy. */
export const metadata: Metadata = pageMeta({
  title: 'Privacy policy | MaeDay',
  description: 'Privacy policy for MaeDay, a service of Antek Automation.',
  path: routes.privacy,
  noindex: true,
});

export default function Page() {
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;
  return (
    <LegalPage title="Privacy policy">
      <p className="mt-6">
        {site.name} is a service of {site.owner}, a {site.legal.status} based at {site.address}. ICO registration number{' '}
        {site.legal.ico}. DUNS number {site.legal.duns}. Contact: {mail}.
      </p>

      <h2>Summary</h2>
      <p>
        We collect what we need to answer your calls, run your account and improve the service: details you give us, call
        recordings and transcripts, and basic website usage. We use service providers such as Retell and Twilio to run
        calls. We do not sell personal data. When Mae answers calls for a property manager, that manager decides how the
        call data is used and we follow their instructions. You can ask us to see, correct or delete your data at any time.
      </p>

      <h2>Who does this policy cover?</h2>
      <ul>
        <li>Visitors to this website.</li>
        <li>Property managers and their staff who book a setup call or use {site.name} (our clients).</li>
        <li>People who call a line that Mae answers for a client, such as tenants, prospects, owners and vendors.</li>
        <li>People who call our demo line.</li>
      </ul>

      <h2>What do we collect?</h2>
      <ul>
        <li>
          <strong>Website use:</strong> pages visited, browser and device type, the page that referred you and campaign
          tags in the link you followed. Analytics cookies are set only if analytics is switched on (see Cookies below).
        </li>
        <li>
          <strong>Bookings and purchases:</strong> your name, company, email, phone number and anything you tell us when
          you book a setup call or buy a plan.
        </li>
        <li>
          <strong>Client setup:</strong> your properties, emergency lists, scripts, the names and phone numbers on your
          on-call ladder, the email addresses that receive call summaries and your billing details.
        </li>
        <li>
          <strong>Calls:</strong> the caller&apos;s phone number, a recording and transcript of the call, details the
          caller gives (such as name, unit and the problem) and the time and result of each transfer attempt. Every call
          opens with a short recording notice.
        </li>
      </ul>

      <h2>How do we use it?</h2>
      <ul>
        <li>To answer calls by your rules, transfer emergencies and send call summaries.</li>
        <li>To set up, test and support your line, and to bill you.</li>
        <li>To reply to you and run setup calls.</li>
        <li>To find and fix faults and make Mae better at following client rules.</li>
        <li>To understand how the website is used.</li>
        <li>To meet legal obligations and prevent fraud or abuse.</li>
      </ul>
      <p>
        Under UK GDPR our legal bases are performing a contract, our legitimate interests in running and improving the
        service, legal obligations and, for marketing email, your consent.
      </p>

      <h2>Who controls data from calls to a client&apos;s line?</h2>
      <p>
        When Mae answers calls for a property manager, the property manager is the controller of that call data and we
        process it on their behalf and on their instructions. If you called your property manager&apos;s line and want
        to ask about your data, contact them first. We will help them answer you, and you can also contact us directly.
      </p>

      <h2>Who do we share it with?</h2>
      <p>We do not sell or rent personal data, and we do not share it for targeted advertising. We share it only with:</p>
      <ul>
        <li>The client whose line was called, through call transfers, summaries, recordings and transcripts.</li>
        <li>
          Service providers who run parts of the service for us: Retell (voice agent), Twilio (phone numbers and call
          transfers), our email provider, Vercel (website hosting), our booking calendar and checkout providers and, if
          analytics is switched on, Google. Each may use the data only to provide its service to us.
        </li>
        <li>Authorities or courts where the law requires it, or to protect our legal rights.</li>
      </ul>

      <h2>Where is it processed?</h2>
      <p>
        {site.owner} is based in the United Kingdom. Our call and hosting providers are based in the United States, so
        call data is processed there. Where personal data moves between the UK and other countries we use the safeguards
        UK GDPR requires, such as adequacy regulations or standard contractual clauses.
      </p>

      <h2>How long do we keep it?</h2>
      <ul>
        <li>Call recordings: 90 days, then permanently deleted.</li>
        <li>Call transcripts and call logs: up to 12 months.</li>
        <li>Setup call bookings and messages: up to 3 years.</li>
        <li>Website analytics: up to 26 months.</li>
        <li>Contract and billing records: 6 years after the contract ends.</li>
      </ul>
      <p>A client can ask us to delete their call data sooner.</p>

      <h2>What are your rights?</h2>
      <p>
        Under UK GDPR you can ask to access, correct or delete your data, to restrict or object to how we use it, to
        receive it in a portable format, to withdraw consent and not to be subject to decisions based solely on automated
        processing that have legal or similarly significant effects. Residents of some US states have similar rights to
        know, access, correct and delete their data and to opt out of its sale. We honor these requests wherever you live,
        and we will not treat you differently for making one.
      </p>
      <p>To make a request, email {mail}. We reply within one month, and tell you if we need longer.</p>

      <h2>Do we use cookies?</h2>
      <p>
        The site sets no cookies of its own. If analytics is switched on, Google Tag Manager and Google Analytics set
        cookies to measure visits. The site also keeps the campaign tags from your link, and whether a purchase was
        counted, in your browser&apos;s session storage, which is cleared when you close the tab. You can block or
        delete cookies in your browser settings.
      </p>

      <h2>How do we protect it?</h2>
      <p>
        We use encryption in transit, access controls and regular security reviews, and we limit access to the people and
        providers who need it. No method of sending data over the internet is completely secure.
      </p>

      <h2>Children</h2>
      <p>
        {site.name} is a service for businesses and is not directed at children under 13. If we learn we hold a
        child&apos;s data outside a client&apos;s call records, we delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>We post any changes on this page and update the date at the top.</p>

      <h2>How do you complain?</h2>
      <p>
        Contact us first at {mail}. You can also complain to the UK Information Commissioner&apos;s Office at{' '}
        <a href="https://ico.org.uk">ico.org.uk</a> or on 0303 123 1113. US residents can also contact their state
        attorney general.
      </p>

      <h2>Contact</h2>
      <p>
        {site.owner} ({site.legal.status}), {site.address}. Email: {mail}. ICO registration: {site.legal.ico}. DUNS:{' '}
        {site.legal.duns}.
      </p>
    </LegalPage>
  );
}
